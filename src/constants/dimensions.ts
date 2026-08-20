export interface DimensionMeta {
  key: string;
  name: string;
  category: string;
  description: string;
}

export const DIMENSIONS_META: Record<string, DimensionMeta> = {
  visibilidad: {
    key: 'visibilidad',
    name: 'Visibilidad Cross-Layer',
    category: 'Visibilidad',
    description: 'Monitoreo, telemetría y dashboards unificados de capas IT, energía y cooling.',
  },
  friccion: {
    key: 'friccion',
    name: 'Atribución de Fricción',
    category: 'Fricción',
    description: 'Sincronización y velocidad de adaptación entre energía, cooling y workloads.',
  },
  latencia: {
    key: 'latencia',
    name: 'Latencia de Coordinación',
    category: 'Latencia',
    description: 'Procesos de coordinación de red, automatización y tiempos de respuesta operativa.',
  },
  auto_cuantificacion: {
    key: 'auto_cuantificacion',
    name: 'Auto-cuantificación',
    category: 'Cuantificación',
    description: 'Medición continua y granular de PUE y capacidad de utilización real.',
  },
  bloqueantes: {
    key: 'bloqueantes',
    name: 'Bloqueantes Operativos',
    category: 'Bloqueantes',
    description: 'Restricciones de talento, supply chain, red eléctrica y cumplimiento normativo.',
  },
};

export const FRICTION_PROFILES: Record<string, { qualitative: string; topQuartile: string }> = {
  visibilidad: {
    qualitative: 'Tu operación tiene puntos ciegos entre energía, cooling y workloads: las decisiones se toman con información parcial o desactualizada.',
    topQuartile: 'Los operadores del cuartil superior integran telemetría de las 3 capas en un solo dashboard en tiempo real, anticipando problemas antes de que impacten la operación.',
  },
  friccion: {
    qualitative: 'Energía y cooling no reaccionan a tiempo a los cambios de carga, generando ineficiencias y sobrecostos evitables.',
    topQuartile: 'El cuartil superior sincroniza energía y cooling con los workloads de forma proactiva o automática, reduciendo el desperdicio de capacidad.',
  },
  latencia: {
    qualitative: 'La coordinación entre equipos es lenta y depende de procesos manuales, lo que retrasa la respuesta ante incidentes.',
    topQuartile: 'Los mejores operadores automatizan la mayoría de sus procesos rutinarios y reservan la intervención humana solo para decisiones críticas.',
  },
  auto_cuantificacion: {
    qualitative: 'No cuentas con métricas confiables de PUE ni de utilización real, lo que dificulta identificar capacidad desperdiciada.',
    topQuartile: 'El cuartil superior mide PUE y utilización en tiempo real, con metas activas de optimización y seguimiento de tendencias.',
  },
  bloqueantes: {
    qualitative: 'Factores externos como personal, cadena de suministro, red eléctrica o regulación están limitando tu capacidad de operar y crecer.',
    topQuartile: 'Los operadores líderes diversifican proveedores, forman talento interno y anticipan restricciones regulatorias antes de que se conviertan en bloqueos.',
  },
};
