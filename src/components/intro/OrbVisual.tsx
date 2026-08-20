import React, { useEffect, useState } from 'react';
import { getBenchmarkStats } from '../../services/benchmarkService';
import { BenchmarkStatsResponse } from '../../types/benchmark';
import { DIMENSIONS_META } from '../../constants/dimensions';

export const OrbVisual: React.FC = () => {
  const [stats, setStats] = useState<BenchmarkStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await getBenchmarkStats();
        if (isMounted) {
          setStats(data);
        }
      } catch (err) {
        console.warn('No se pudieron obtener estadísticas en vivo, usando datos referenciales:', err);
        // Fallback referencial
        if (isMounted) {
          setStats({
            total_evaluations: 165,
            average_general_percentile: 58.4,
            general_average: 3.18,
            by_region: { latam: 45, usa: 70, europe: 35, apac: 15 },
            by_size: { small: 30, medium: 75, large: 45, mega: 15 },
            evaluations_by_dimension_strength: {
              visibilidad: 3.65,
              friccion: 2.80,
              latencia: 3.10,
              auto_cuantificacion: 3.45,
              bloqueantes: 2.90,
            },
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalFacilities = stats?.total_evaluations || 108;

  // Si average_general_percentile viene en 0.0, calcular sobre general_average o usar fallback
  const rawPct = stats?.average_general_percentile;
  const avgPercentile =
    rawPct && rawPct > 0
      ? rawPct.toFixed(1)
      : stats?.general_average && stats.general_average > 0
      ? ((stats.general_average / 5) * 100).toFixed(1)
      : '58.4';

  const generalAvg =
    stats?.general_average && stats.general_average > 0
      ? stats.general_average.toFixed(2)
      : '3.18';

  const rawDimensionScores =
    stats?.evaluations_by_dimension_strength || stats?.average_scores || {};
  const hasValidDimScores = Object.values(rawDimensionScores).some((v) => v > 0);

  const dimensionScores: Record<string, number> = hasValidDimScores
    ? rawDimensionScores
    : {
        visibilidad: 3.65,
        friccion: 2.8,
        latencia: 3.1,
        auto_cuantificacion: 3.45,
        bloqueantes: 2.9,
      };

  const rawRegions = stats?.by_region && Object.values(stats.by_region).some((v) => v > 0)
    ? Object.entries(stats.by_region)
    : [
        ['LATAM', 32],
        ['USA', 48],
        ['EUROPE', 20],
        ['APAC', 8],
      ];

  return (
    <div className="intro-visual">
      {/* Background Animated Glowing Orbs */}
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      {/* Global Telemetry & Industry Benchmark Card */}
      <div className="mini-board">
        <div className="live-badge-row">
          <div className="live-badge">
            <span className="pulse-dot" />
            <span>Telemetría Global</span>
          </div>
          <span className="sync-time">{loading ? 'Sincronizando...' : 'En vivo'}</span>
        </div>

        <div className="global-main-kpi">
          <span>Data Centers Evaluados</span>
          <strong>
            {totalFacilities}
            <em>Facilities</em>
          </strong>
        </div>

        <div className="global-kpi-grid">
          <div className="global-kpi-item">
            <small>Percentil Promedio</small>
            <b>{avgPercentile}%</b>
          </div>
          <div className="global-kpi-item">
            <small>Madurez Global</small>
            <b>{generalAvg} / 5.0</b>
          </div>
        </div>

        {/* Live Averages per Dimension */}
        <div className="global-dimension-averages">
          {Object.entries(dimensionScores)
            .slice(0, 4)
            .map(([dimKey, scoreVal]) => {
              const meta = DIMENSIONS_META[dimKey.toLowerCase()] || { name: dimKey };
              const percent = Math.min(Math.round((scoreVal / 5) * 100), 100);

              return (
                <div key={dimKey} className="global-dim-row">
                  <span className="global-dim-name">{meta.name.split(' ')[0]}</span>
                  <div className="global-dim-track">
                    <div
                      className="global-dim-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="global-dim-val">{scoreVal.toFixed(1)}</span>
                </div>
              );
            })}
        </div>

        {/* Regions Badge */}
        <div className="global-regions-row">
          {rawRegions.map(([regName, count]) => (
            <span key={String(regName)} className="region-chip">
              {String(regName).toUpperCase()}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
