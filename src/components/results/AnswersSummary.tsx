import React, { useState } from 'react';
import { QUESTIONS_DATA } from '../../constants/questions';
import { useBenchmark } from '../../context/BenchmarkContext';

export const AnswersSummary: React.FC = () => {
  const { answers } = useBenchmark();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="panel-block">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 style={{ margin: 0 }}>📋 Resumen de Respuestas ({QUESTIONS_DATA.length})</h3>
        <button
          type="button"
          className="btn-back"
          style={{ padding: '6px 14px', fontSize: '0.85rem' }}
        >
          {isExpanded ? 'Ocultar ▲' : 'Ver detalle ▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="answers-panel" style={{ marginTop: '16px' }}>
          {QUESTIONS_DATA.map((q, idx) => {
            const val = answers[q.field] || 'No respondido';
            return (
              <div key={q.key} className="answer-row">
                <div className="answer-label">
                  <strong>P{idx + 1}:</strong> {q.question}
                </div>
                <div className="answer-value">Score {val}/5</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
