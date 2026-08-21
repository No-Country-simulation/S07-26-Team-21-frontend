import React, { useState } from 'react';
import { FileDown, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { DIMENSIONS_META } from '../../constants/dimensions';
import { generateBenchmarkPDF } from '../../services/pdfReportService';
import { ScoreRing } from './ScoreRing';
import { StatsGrid } from './StatsGrid';
import { DimensionBars } from './DimensionBars';
import { InsightBanner } from './InsightBanner';
import { PeerComparisonCard } from './PeerComparisonCard';
import { NarrativesCard } from './NarrativesCard';
import { CertificationSeal } from './CertificationSeal';
import { AnswersSummary } from './AnswersSummary';
import { ErrorBanner } from '../common/ErrorBanner';

export const ResultsDashboard: React.FC = () => {
  const {
    apiResponse,
    apiError,
    localScoreSummary,
    facilitySize,
    region,
    restartBenchmark,
  } = useBenchmark();

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Si hay respuesta real del backend, usamos sus scores exactos; sino fallback local
  const finalScore = apiResponse
    ? apiResponse.percentiles?.general || Math.round(Object.values(apiResponse.scores_likert).reduce((a, b) => a + b, 0) / 5 * 20)
    : localScoreSummary.finalScore;

  const percentile = apiResponse
    ? apiResponse.percentiles?.general || 50
    : localScoreSummary.percentile;

  const dimensionScores: Record<string, number> = apiResponse?.scores_likert || localScoreSummary.dimensionScores;

  const weakestDimensionKey = apiResponse?.main_weakness?.dimension || localScoreSummary.weakestDimension;
  const weakestDimensionMeta = DIMENSIONS_META[weakestDimensionKey.toLowerCase()] || {
    name: weakestDimensionKey,
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);
    setDownloadSuccess(false);

    try {
      generateBenchmarkPDF({
        apiResponse,
        facilitySize,
        region,
        finalScore,
        percentile,
        dimensionScores,
        weakestDimensionKey,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error al generar el PDF del reporte:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="results-shell">
      {apiError && <ErrorBanner message={apiError} />}

      <div className="results-header-row">
        <div>
          <div className="results-kicker">INFORME DE AUDITORÍA</div>
          <h1 className="results-title">¡Diagnóstico Completado!</h1>
        </div>
        <div className="score-pill">Score General: {finalScore}/100</div>
      </div>

      <div className="results-grid">
        <ScoreRing score={finalScore} />
        <StatsGrid
          score={finalScore}
          facilitySize={facilitySize}
          region={region}
          weakestDimensionName={weakestDimensionMeta.name}
        />
      </div>

      <DimensionBars scores={dimensionScores} />

      <InsightBanner weakestDimensionName={weakestDimensionMeta.name} />

      <PeerComparisonCard
        peerComparison={apiResponse?.peer_comparison}
        percentile={percentile}
      />

      <NarrativesCard
        mainWeakness={apiResponse?.main_weakness}
        narratives={apiResponse?.narratives}
        weakestDimensionKey={weakestDimensionKey}
      />

      <CertificationSeal />

      <AnswersSummary />

      <div className="results-actions-group">
        <button
          type="button"
          className="pdf-download-btn"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 size={20} />
              <span>¡Reporte PDF Descargado con Éxito!</span>
            </>
          ) : isGeneratingPdf ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              <span>Generando Reporte Ejecutivo...</span>
            </>
          ) : (
            <>
              <FileDown size={20} />
              <span>Descargar Reporte Ejecutivo (PDF)</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="restart-btn"
          onClick={restartBenchmark}
        >
          <span>Reiniciar Diagnóstico ↺</span>
        </button>
      </div>
    </div>
  );
};

