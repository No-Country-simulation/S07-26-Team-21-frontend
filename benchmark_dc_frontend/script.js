// DEFINICIÓN DEL CUESTIONARIO (14 PASOS / 15 PREGUNTAS)
const stepsData = [
  {
    type: 'context',
    category: 'CONTEXTO',
    question: '¿Cuál es el tamaño de tu facility?',
    key: 'facilitySize',
    options: ['Pequeño', 'Mediano', 'Grande', 'Hyperscale']
  },
  {
    type: 'context',
    category: 'CONTEXTO',
    question: '¿Qué tipo de facility operan?',
    key: 'facilityType',
    options: ['Enterprise', 'Colocation', 'Hyperscale', 'Edge']
  },
  {
    type: 'context',
    category: 'CONTEXTO',
    question: '¿En qué región está ubicado?',
    key: 'region',
    options: ['Norteamérica', 'LatAm', 'Europa', 'Asia-Pacífico', 'Otro']
  },
  {
    type: 'scale',
    category: 'VISIBILIDAD CROSS-LAYER',
    question: '¿Qué tan unificada es la vista que tienen de energía, cooling y workloads?',
    key: 'P2',
    descriptions: {
      1: 'Silos absolutos: cada capa tiene su herramienta aislada.',
      2: 'Tenemos reportes separados que a veces cruzamos manualmente.',
      3: 'Dashboards parciales con integración básica entre 2 capas.',
      4: 'Vista centralizada en tiempo real para las 3 capas.',
      5: 'Plataforma unificada avanzada con analítica predictiva cross-layer.'
    }
  },
  {
    type: 'scale',
    category: 'ATRIBUCIÓN DE FRICCIÓN',
    question: '¿Qué tan claro tienen dónde pierden más capacidad entre capas?',
    key: 'P4',
    descriptions: {
      1: 'Sin visibilidad: no sabemos por qué se pierde capacidad.',
      2: 'Tenemos una intuición basada en experiencia, sin datos.',
      3: 'Identificamos pérdidas después de análisis post-mortem.',
      4: 'Medición periódica con atribución clara de causas.',
      5: 'Cuantificación exacta e instantánea de fricción por capa.'
    }
  },
  {
    type: 'scale',
    category: 'LATENCIA DE COORDINACIÓN',
    question: '¿Cuánto tarda la coordinación manual para aprovisionar nueva capacidad?',
    key: 'P6',
    descriptions: {
      1: 'Semanas (2-4 semanas de coordinación entre equipos).',
      2: 'Días (2-7 días de trámites y aprobaciones).',
      3: 'Horas (12-24 horas con procesos estandarizados).',
      4: 'Pocas horas (2-4 horas semi-automatizado).',
      5: 'Minutos (< 30 minutos con automatización de punta a punta).'
    }
  },
  {
    type: 'scale',
    category: 'AUTO-CUANTIFICACIÓN',
    question: '¿Qué tan precisa es la medición de su PUE (Power Usage Effectiveness)?',
    key: 'P9',
    descriptions: {
      1: 'No calculamos PUE regularmente.',
      2: 'Estimación anual o global basada en facturas eléctricas.',
      3: 'Cálculo mensual manual con mediciones de sub-medidores.',
      4: 'Medición PUE automatizada en tiempo real a nivel facility.',
      5: 'PUE dinámico continuo granular por sala y por rack.'
    }
  },
  {
    type: 'scale',
    category: 'AUTO-CUANTIFICACIÓN',
    question: '¿Conocen con exactitud su utilización real vs capacidad stranded?',
    key: 'P10',
    descriptions: {
      1: 'Desconocemos la capacidad perdida exacta.',
      2: 'Estimado vago basado en capacidad instalada nominal.',
      3: 'Auditorías periódicas de inventario físico y carga.',
      4: 'Monitoreo en tiempo real de capacidad usada vs reservada.',
      5: 'Visibilidad total e instantánea de stranded capacity exacta.'
    }
  },
  {
    type: 'scale',
    category: 'BLOQUEANTES OPERATIVOS',
    question: '¿Cuentan con suficiente personal calificado para la operación?',
    key: 'P11',
    descriptions: {
      1: 'Déficit severo de personal capacitado.',
      2: 'Falta de expertise en integración cross-layer.',
      3: 'Equipo básico suficiente para operación estándar.',
      4: 'Personal capacitado en la mayoría de tecnologías.',
      5: 'Equipo altamente especializado y multidisciplinario.'
    }
  },
  {
    type: 'scale',
    category: 'BLOQUEANTES OPERATIVOS',
    question: '¿Qué nivel de retrasos enfrentan en la cadena de suministro?',
    key: 'P12',
    descriptions: {
      1: 'Retrasos críticos que paralizan expansiones (> 6 meses).',
      2: 'Retrasos frecuentes en componentes clave.',
      3: 'Impacto moderado gestionable con stock.',
      4: 'Mínimos retrasos sin impacto directo.',
      5: 'Cadena de suministro optimizada e integrada.'
    }
  },
  {
    type: 'scale',
    category: 'BLOQUEANTES DE INFRAESTRUCTURA',
    question: '¿Existen restricciones severas en la red eléctrica o potencia contratada?',
    key: 'P13',
    descriptions: {
      1: 'Límite de potencia alcanzado sin opción de expansión.',
      2: 'Frecuentes restricciones o alta volatilidad de red.',
      3: 'Restricciones moderadas en horas pico.',
      4: 'Suministro estable con pequeña holgura de crecimiento.',
      5: 'Sin restricciones de potencia y con respaldo redundante.'
    }
  },
  {
    type: 'scale',
    category: 'BLOQUEANTES REGULATORIOS',
    question: '¿Cómo afectan las regulaciones locales/ambientales la operación?',
    key: 'P14',
    descriptions: {
      1: 'Barreras regulatorias severas que limitan eficiencia.',
      2: 'Cumplimiento complejo que desacelera cambios.',
      3: 'Impacto estándar gestionado por legal/ops.',
      4: 'Facilidad de cumplimiento con normativas locales.',
      5: 'Alineación total proactiva con estándares internacionales.'
    }
  },
  {
    type: 'scale',
    category: 'EXPERTISE INTERNA',
    question: '¿Tienen la expertise interna para ejecutar proyectos de optimización?',
    key: 'P15',
    descriptions: {
      1: 'Dependencia 100% de consultores externos.',
      2: 'Conocimiento interno limitado para proyectos complejos.',
      3: 'Capacidad interna para mantenimiento y pequeñas mejoras.',
      4: 'Equipo competente con capacidad de innovación.',
      5: 'Líderes en la industria con capacidad R&D propia.'
    }
  }
];

let currentStepIndex = 0;
const userAnswers = {};

const stepCounterEl = document.getElementById('stepCounter');
const progressBarContainer = document.getElementById('progressBarContainer');
const cardContainer = document.getElementById('cardContainer');

function initApp() {
  renderProgressBar();
  renderStep();
}

function renderProgressBar() {
  progressBarContainer.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const seg = document.createElement('div');
    seg.className = `progress-segment ${i <= currentStepIndex ? 'active' : ''}`;
    progressBarContainer.appendChild(seg);
  }
}

function renderStep() {
  renderProgressBar();
  
  if (currentStepIndex >= stepsData.length) {
    renderResults();
    return;
  }

  const stepNum = String(currentStepIndex + 1).padStart(2, '0');
  stepCounterEl.textContent = `PASO ${stepNum} / 14`;

  const data = stepsData[currentStepIndex];

  if (data.type === 'context') {
    renderContextStep(data);
  } else {
    renderScaleStep(data);
  }
}

function renderContextStep(data) {
  const selectedVal = userAnswers[data.key] || '';

  cardContainer.innerHTML = `
    <div>
      <div class="category-tag">${data.category}</div>
      <h2 class="question-title">${data.question}</h2>
      <div class="options-pills">
        ${data.options.map(opt => `
          <button class="pill-btn ${selectedVal === opt ? 'selected' : ''}" onclick="selectContextOption('${data.key}', '${opt}')">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="nav-buttons">
      <button class="btn-back" onclick="prevStep()" ${currentStepIndex === 0 ? 'disabled style="opacity:0.3"' : ''}>← Atrás</button>
      <button class="btn-next" id="btnNext" onclick="nextStep()" ${!selectedVal ? 'disabled' : ''}>Siguiente →</button>
    </div>
  `;
}

function renderScaleStep(data) {
  const selectedVal = userAnswers[data.key] || null;
  const descText = selectedVal ? data.descriptions[selectedVal] : 'Selecciona una opción del 1 al 5';

  cardContainer.innerHTML = `
    <div>
      <div class="category-tag">${data.category}</div>
      <h2 class="question-title">${data.question}</h2>
      
      <div class="scale-container">
        ${[1, 2, 3, 4, 5].map(num => `
          <div class="scale-box ${selectedVal === num ? 'selected' : ''}" onclick="selectScaleOption('${data.key}', ${num})">
            ${num}
          </div>
        `).join('')}
      </div>

      <div class="description-box" id="descBox">
        ${descText}
      </div>
    </div>

    <div class="nav-buttons">
      <button class="btn-back" onclick="prevStep()">← Atrás</button>
      <button class="btn-next" id="btnNext" onclick="nextStep()" ${!selectedVal ? 'disabled' : ''}>Siguiente →</button>
    </div>
  `;
}

function selectContextOption(key, value) {
  userAnswers[key] = value;
  renderStep();
}

function selectScaleOption(key, value) {
  userAnswers[key] = value;
  renderStep();
}

function nextStep() {
  if (currentStepIndex < stepsData.length) {
    currentStepIndex++;
    renderStep();
  }
}

function prevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  }
}

function renderResults() {
  stepCounterEl.textContent = 'PASO 14 / 14';

  const p2 = userAnswers['P2'] || 3;
  const p4 = userAnswers['P4'] || 2;
  const p6 = userAnswers['P6'] || 4;
  const p9 = userAnswers['P9'] || 4;
  const p11 = userAnswers['P11'] || 4;

  const visPctl = Math.round((p2 / 5) * 100);
  const fricPctl = Math.round((p4 / 5) * 100);
  const latPctl = Math.round((p6 / 5) * 100);
  const quantPctl = Math.round((p9 / 5) * 100);
  const blockPctl = Math.round((p11 / 5) * 100);

  const overallPctl = Math.round((visPctl + fricPctl + latPctl + quantPctl + blockPctl) / 5);

  const dims = [
    { name: 'Visibilidad cross-layer', val: visPctl },
    { name: 'Atribución de fricción', val: fricPctl },
    { name: 'Latencia de coordinación', val: latPctl },
    { name: 'Auto-cuantificación', val: quantPctl },
    { name: 'Bloqueantes', val: blockPctl }
  ];

  dims.sort((a, b) => a.val - b.val);
  const weakest = dims[0];

  cardContainer.innerHTML = `
    <div>
      <div class="results-header">
        <div class="results-subtitle">TU RESULTADO</div>
        <h1 class="results-title">Posición relativa en la industria</h1>
      </div>

      <div class="gauge-wrapper">
        <svg class="gauge-svg" viewBox="0 0 100 55">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gaugeGrad)" stroke-width="8" stroke-linecap="round"
                stroke-dasharray="125.6" stroke-dashoffset="${125.6 * (1 - overallPctl / 100)}"/>
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f59e0b" />
              <stop offset="50%" stop-color="#2dd4bf" />
              <stop offset="100%" stop-color="#34d399" />
            </linearGradient>
          </defs>
        </svg>
        <div class="gauge-value">
          <div class="gauge-score">P${overallPctl}</div>
          <div class="gauge-label">PERCENTIL GENERAL</div>
        </div>
      </div>

      <div class="metric-card">
        <div>
          <div class="metric-title">PUE calculado (vs. promedio industria 1.54)</div>
          <div class="metric-val">1.00</div>
        </div>
        <div class="metric-pctl">Percentil P90</div>
      </div>

      <div class="dimensions-list">
        <div class="dim-row">
          <span class="dim-label ${visPctl === weakest.val ? 'highlight' : ''}">Visibilidad cross-layer</span>
          <div class="dim-bar-bg"><div class="dim-bar-fill" style="width: ${visPctl}%"></div></div>
          <span class="dim-val">P${visPctl}</span>
        </div>
        <div class="dim-row">
          <span class="dim-label ${weakest.name === 'Atribución de fricción' ? 'highlight' : ''}">Atribución de fricción</span>
          <div class="dim-bar-bg"><div class="dim-bar-fill ${weakest.name === 'Atribución de fricción' ? 'weakness' : ''}" style="width: ${fricPctl}%"></div></div>
          <span class="dim-val">P${fricPctl}</span>
        </div>
        <div class="dim-row">
          <span class="dim-label">Latencia de coordinación</span>
          <div class="dim-bar-bg"><div class="dim-bar-fill" style="width: ${latPctl}%"></div></div>
          <span class="dim-val">P${latPctl}</span>
        </div>
        <div class="dim-row">
          <span class="dim-label">Auto-cuantificación</span>
          <div class="dim-bar-bg"><div class="dim-bar-fill" style="width: ${quantPctl}%"></div></div>
          <span class="dim-val">P${quantPctl}</span>
        </div>
        <div class="dim-row">
          <span class="dim-label">Bloqueantes</span>
          <div class="dim-bar-bg"><div class="dim-bar-fill" style="width: ${blockPctl}%"></div></div>
          <span class="dim-val">P${blockPctl}</span>
        </div>
      </div>

      <div class="insight-card warning">
        <div class="insight-tag">⚠️ TU MAYOR FRICCIÓN</div>
        Tu punto más débil relativo es <strong>${weakest.name}</strong> — estás en el percentil ${weakest.val} de la industria en esa dimensión.
      </div>

      <div class="insight-card success">
        <div class="insight-tag">QUÉ HACE DISTINTO EL CUARTIL SUPERIOR</div>
        Los operadores del cuartil superior tienen cuantificada, con datos, la interfaz exacta donde pierden capacidad — no dependen de intuición.
      </div>
    </div>

    <button class="restart-btn" onclick="restartBenchmark()">↺ Volver a empezar (demo)</button>
  `;
}

function restartBenchmark() {
  currentStepIndex = 0;
  for (let key in userAnswers) delete userAnswers[key];
  renderStep();
}

document.addEventListener('DOMContentLoaded', initApp);
