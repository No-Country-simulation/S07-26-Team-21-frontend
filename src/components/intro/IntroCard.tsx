import React, { useState } from 'react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { OrbVisual } from './OrbVisual';
import { FacilityForm } from './FacilityForm';

export const IntroCard: React.FC = () => {
  const { startBenchmark } = useBenchmark();
  const [consent, setConsent] = useState<boolean>(true);

  return (
    <div className="intro-layout">
      <div className="intro-card">
        <OrbVisual />

        <div className="intro-content">
          <div className="brand-title">
            BENCHMARK<span className="dot">•</span>DC
          </div>
          <div className="intro-kicker">MOTOR DE BENCHMARK • DATA CENTERS</div>

          <h1 className="intro-title">¿Cuánta capacidad estás pagando sin usar?</h1>

          <p className="intro-text">
            Este diagnóstico mide qué tan coordinadas están las capas de energía, cooling y workloads
            en tu facility. A cambio de tus respuestas, recibes tu posición relativa frente al resto de la
            industria analizada por IA y telemetría de vanguardia.
          </p>

          <div className="meta-list">
            <div className="meta-pill">📋 15 preguntas</div>
            <div className="meta-pill">⏱️ ~8 minutos</div>
            <div className="meta-pill">⚡ 5 dimensiones</div>
          </div>

          <FacilityForm />

          <div className="security-row">🔒 ANONIMATO GARANTIZADO</div>

          <p className="privacy-copy">
            No te pedimos tu nombre, tu empresa ni ningún dato que te identifique. Los datos agregados se
            utilizan exclusivamente para calibrar percentiles y generar recomendaciones con IA.
          </p>

          <label className="consent-row">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Entiendo que este diagnóstico es anónimo y acepto participar.</span>
          </label>

          <div className="cta-row">
            <button
              className="cta-button"
              disabled={!consent}
              onClick={startBenchmark}
            >
              Comenzar diagnóstico →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
