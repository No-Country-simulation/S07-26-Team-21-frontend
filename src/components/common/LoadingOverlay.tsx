import React from 'react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <h2 className="results-title" style={{ fontSize: '1.8rem' }}>
        Procesando Benchmark con IA...
      </h2>
      <p className="intro-text" style={{ maxWidth: '500px' }}>
        Calculando percentiles por segmento, analizando telemetría y generando recomendaciones personalizadas.
      </p>
    </div>
  );
};
