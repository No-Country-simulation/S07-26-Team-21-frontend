import React from 'react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { DIMENSIONS_META } from '../../constants/dimensions';
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

      <button
        type="button"
        className="restart-btn"
        onClick={restartBenchmark}
      >
        Reiniciar nuevo diagnóstico ↺
      </button>
    </div>
  );
};
