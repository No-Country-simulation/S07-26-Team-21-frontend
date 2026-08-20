import React from 'react';

interface NavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
  isSubmitting: boolean;
}

export const NavButtons: React.FC<NavButtonsProps> = ({
  onPrev,
  onNext,
  isFirst,
  isLast,
  canProceed,
  isSubmitting,
}) => {
  return (
    <div className="nav-buttons">
      <button
        type="button"
        className="btn-back"
        onClick={onPrev}
        disabled={isSubmitting}
      >
        ← {isFirst ? 'Inicio' : 'Atrás'}
      </button>

      <button
        type="button"
        className="btn-next"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
      >
        {isSubmitting
          ? 'Procesando diagnóstico...'
          : isLast
          ? 'Terminar diagnóstico ✓'
          : 'Siguiente →'}
      </button>
    </div>
  );
};
