import React from 'react';

interface InsightBannerProps {
  weakestDimensionName: string;
}

export const InsightBanner: React.FC<InsightBannerProps> = ({ weakestDimensionName }) => {
  return (
    <div className="insight-banner">
      <span>⚡ Insight Crítico</span>
      Tu mayor área de fricción detectada se encuentra en <strong>{weakestDimensionName}</strong>.
      Esta dimensión es el factor determinante que restringe la eficiencia energética, la coordinación
      y la escalabilidad de tu data center.
    </div>
  );
};
