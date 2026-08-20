import React from 'react';

interface ScaleSelectorProps {
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export const ScaleSelector: React.FC<ScaleSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="scale-container" role="radiogroup" aria-label="Escala Likert de 1 a 5">
      {[1, 2, 3, 4, 5].map((val) => {
        const isSelected = selected === val;
        return (
          <button
            key={val}
            type="button"
            className={`scale-box ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(val)}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Opción ${val}`}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};
