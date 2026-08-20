import React from 'react';
import { MainWeakness, Narratives } from '../../types/benchmark';
import { FRICTION_PROFILES } from '../../constants/dimensions';

interface NarrativesCardProps {
  mainWeakness?: MainWeakness;
  narratives?: Narratives;
  weakestDimensionKey: string;
}

export const NarrativesCard: React.FC<NarrativesCardProps> = ({
  mainWeakness,
  narratives,
  weakestDimensionKey,
}) => {
  const fallback = FRICTION_PROFILES[weakestDimensionKey] || FRICTION_PROFILES['latencia'];
  const explanation = narratives?.weakness_explanation || fallback.qualitative;
  const practices = narratives?.top_quartile_practices || fallback.topQuartile;
  const isLLM = narratives?.llm_generated || mainWeakness?.llm_generated;

  return (
    <>
      <div className="panel-block">
        <h3>
          💡 Análisis de Fricción Principal
          {isLLM && <span className="ai-badge">IA Generativa</span>}
        </h3>
        <p className="panel-copy">{explanation}</p>
      </div>

      <div className="panel-block">
        <h3>🏆 Prácticas del Cuartil Superior (Top 25%)</h3>
        <p className="panel-copy">{practices}</p>
      </div>

      {mainWeakness?.recommendations && mainWeakness.recommendations.length > 0 && (
        <div className="panel-block">
          <h3>
            🎯 Recomendaciones Estratégicas Prioritarias
            {isLLM && <span className="ai-badge">Motor IA</span>}
          </h3>
          <div className="recommendations-list">
            {mainWeakness.recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-item">
                <span style={{ color: 'var(--green-1)', fontWeight: 800 }}>•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
