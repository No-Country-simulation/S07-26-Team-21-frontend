import React from 'react';
import { PeerComparison } from '../../types/benchmark';

interface PeerComparisonCardProps {
  peerComparison?: PeerComparison;
  percentile: number;
}

export const PeerComparisonCard: React.FC<PeerComparisonCardProps> = ({
  peerComparison,
  percentile,
}) => {
  return (
    <div className="panel-block">
      <h3>
        🌐 Comparativa de Segmento Peer
        {peerComparison && <span className="ai-badge">Telemetría Peer</span>}
      </h3>

      <p className="percentile-highlight">
        Tu infraestructura se posiciona en el <strong>percentil {percentile}%</strong> de madurez frente
        a instalaciones comparables.
      </p>

      {peerComparison ? (
        <div style={{ marginTop: '12px' }}>
          <p className="panel-copy">
            <strong>Muestra comparada:</strong> {peerComparison.peers_count} centros de datos del mismo segmento.
          </p>
          <p className="panel-copy" style={{ marginTop: '6px' }}>
            {peerComparison.message}
            {peerComparison.gap_vs_peers !== null && (
              <span> (Brecha de score: {peerComparison.gap_vs_peers > 0 ? `+${peerComparison.gap_vs_peers}` : peerComparison.gap_vs_peers})</span>
            )}
          </p>
        </div>
      ) : (
        <p className="panel-copy">
          El percentil refleja la distribución de operadores evaluados en infraestructuras de similar escala y perfil de carga.
        </p>
      )}
    </div>
  );
};
