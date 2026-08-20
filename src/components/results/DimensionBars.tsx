import React from 'react';
import { DIMENSIONS_META } from '../../constants/dimensions';

interface DimensionBarsProps {
  scores: Record<string, number>; // Valores en escala 0-100 o Likert 1-5
}

export const DimensionBars: React.FC<DimensionBarsProps> = ({ scores }) => {
  return (
    <div className="panel-block">
      <h3>📊 Desglose por Dimensión Operativa</h3>

      <div className="bars-panel">
        {Object.entries(scores).map(([dimKey, rawVal]) => {
          // Si el score viene en escala 1-5 desde el backend, lo convertimos a 0-100%
          const percentage = rawVal <= 5 ? Math.round((rawVal / 5) * 100) : Math.round(rawVal);
          const meta = DIMENSIONS_META[dimKey.toLowerCase()] || {
            name: dimKey.charAt(0).toUpperCase() + dimKey.slice(1),
          };

          return (
            <div key={dimKey} className="bar-row">
              <div className="bar-label">{meta.name}</div>
              <div className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${Math.min(Math.max(percentage, 5), 100)}%` }}
                />
              </div>
              <div className="bar-value">{percentage}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
