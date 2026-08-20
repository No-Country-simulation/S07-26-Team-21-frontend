import React, { useEffect } from 'react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { QUESTIONS_DATA } from '../../constants/questions';
import { ScaleSelector } from './ScaleSelector';
import { NavButtons } from './NavButtons';

export const QuestionCard: React.FC = () => {
  const {
    currentStepIndex,
    answers,
    setAnswer,
    nextStep,
    prevStep,
    isSubmitting,
  } = useBenchmark();

  const currentQ = QUESTIONS_DATA[currentStepIndex];
  const selectedValue = currentQ ? answers[currentQ.field] : undefined;
  const description = selectedValue
    ? currentQ?.descriptions[selectedValue]
    : 'Selecciona una opción del 1 al 5';

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === QUESTIONS_DATA.length - 1;
  const canProceed = !!selectedValue;

  // Atajos de teclado para ergonomía
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        if (currentQ) {
          setAnswer(currentQ.field as string, parseInt(e.key, 10));
        }
      } else if (e.key === 'Enter' && canProceed && !isSubmitting) {
        nextStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, setAnswer, canProceed, isSubmitting, nextStep]);

  if (!currentQ) return null;

  return (
    <div className="question-shell">
      <div>
        <div className="category-tag">{currentQ.category}</div>
        <h2 className="question-title">{currentQ.question}</h2>
      </div>

      <ScaleSelector
        selected={selectedValue}
        onSelect={(val) => setAnswer(currentQ.field as string, val)}
      />

      <div className="description-box" role="status" aria-live="polite">
        {description}
      </div>

      <NavButtons
        onPrev={prevStep}
        onNext={nextStep}
        isFirst={isFirst}
        isLast={isLast}
        canProceed={canProceed}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
