import React from 'react';

interface ScoreRingProps {
  score: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score }) => {
  return (
    <div className="score-panel">
      <div
        className="score-ring"
        style={{ '--score': score } as React.CSSProperties}
      >
        <div className="score-ring-inner">
          <strong>{score}%</strong>
          <span>SCORE GENERAL</span>
        </div>
      </div>
    </div>
  );
};
