import React from 'react';
import { useBenchmark } from '../../context/BenchmarkContext';
import { FacilitySize, Region } from '../../types/benchmark';

export const FacilityForm: React.FC = () => {
  const { facilitySize, setFacilitySize, region, setRegion } = useBenchmark();

  return (
    <div className="facility-selector-box">
      <div className="form-group">
        <label htmlFor="facilitySize">Tamaño de Instalación</label>
        <select
          id="facilitySize"
          className="form-select"
          value={facilitySize}
          onChange={(e) => setFacilitySize(e.target.value as FacilitySize)}
        >
          <option value="small">Small (&lt; 1 MW / Edge)</option>
          <option value="medium">Medium (1 - 5 MW / Mid-tier)</option>
          <option value="large">Large (5 - 20 MW / Enterprise)</option>
          <option value="mega">Mega (&gt; 20 MW / Hyperscale)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="region">Región Geográfica</label>
        <select
          id="region"
          className="form-select"
          value={region}
          onChange={(e) => setRegion(e.target.value as Region)}
        >
          <option value="latam">América Latina (LATAM)</option>
          <option value="usa">Norteamérica / USA</option>
          <option value="europe">Europa (EU)</option>
          <option value="apac">Asia Pacífico (APAC)</option>
        </select>
      </div>
    </div>
  );
};
