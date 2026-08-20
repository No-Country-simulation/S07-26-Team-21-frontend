import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useBenchmark } from '../../context/BenchmarkContext';
import { QUESTIONS_DATA } from '../../constants/questions';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentStepIndex, restartBenchmark } = useBenchmark();

  const totalSteps = QUESTIONS_DATA.length;
  const isQuestionStep = currentStepIndex >= 0 && currentStepIndex < totalSteps;
  const stepNumber = String(currentStepIndex + 1).padStart(2, '0');

  return (
    <header className="app-header">
      <div className="logo" onClick={restartBenchmark} title="Volver al inicio">
        BENCHMARK<span>•</span>DC
      </div>

      <div className="header-controls">
        <div className="theme-selector">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
        </div>

        {isQuestionStep && (
          <div className="step-counter">
            PASO {stepNumber} / {totalSteps}
          </div>
        )}
      </div>
    </header>
  );
};
