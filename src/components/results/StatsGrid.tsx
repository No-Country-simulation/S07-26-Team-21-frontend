import React from 'react';

interface StatsGridProps {
  score: number;
  facilitySize: string;
  region: string;
  weakestDimensionName: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  score,
  facilitySize,
  region,
  weakestDimensionName,
}) => {
  return (
    <div className="stats-panel">
      <div className="stat-box accent-green">
        <small>Índice de Madurez</small>
        <strong>{score}%</strong>
      </div>

      <div className="stat-box accent-cyan">
        <small>Segmento Facility</small>
        <strong>
          {facilitySize.toUpperCase()} • {region.toUpperCase()}
        </strong>
      </div>

      <div className="stat-box accent-gold">
        <small>Mayor Oportunidad</small>
        <strong>{weakestDimensionName}</strong>
      </div>
    </div>
  );
};
