import React from 'react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { QUESTIONS_DATA } from '../../constants/questions';

export const ProgressBar: React.FC = () => {
  const { currentStepIndex, answers, goToStep } = useBenchmark();

  if (currentStepIndex < 0 || currentStepIndex >= QUESTIONS_DATA.length) {
    return null;
  }

  return (
    <div className="progress-bar-container">
      {QUESTIONS_DATA.map((q, index) => {
        const isCompleted = index <= currentStepIndex;
        const hasAnswer = !!answers[q.field];

        return (
          <div
            key={q.key}
            className={`progress-segment ${isCompleted ? 'active' : ''}`}
            onClick={() => {
              // Permite navegar a preguntas anteriores o a la actual
              if (index <= currentStepIndex || hasAnswer) {
                goToStep(index);
              }
            }}
            title={`Pregunta ${index + 1}: ${q.category}`}
          />
        );
      })}
    </div>
  );
};
