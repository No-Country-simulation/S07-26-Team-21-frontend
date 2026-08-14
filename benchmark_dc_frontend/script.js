const stepsData = [
  { type: 'scale', category: 'VISIBILIDAD CROSS-LAYER', question: '¿Tienes herramientas para monitorear energía, cooling y workloads?', key: 'P1', descriptions: { 1: 'No tenemos herramientas de monitoreo; todo se revisa manualmente o no se revisa.', 2: 'Tenemos herramientas básicas solo para una de las capas (ej. solo energía).', 3: 'Monitoreamos 2 de las 3 capas con herramientas independientes.', 4: 'Monitoreamos las 3 capas, pero con herramientas separadas y sin integración.', 5: 'Monitoreamos energía, cooling y workloads con herramientas integradas en tiempo real.' } },
  { type: 'scale', category: 'VISIBILIDAD CROSS-LAYER', question: '¿Tienes dashboards que unifiquen las 3 capas?', key: 'P2', descriptions: { 1: 'No tenemos dashboards; los datos se consultan manualmente si es necesario.', 2: 'Tenemos dashboards básicos para una sola capa.', 3: 'Tenemos dashboards separados para cada capa, sin correlación entre ellos.', 4: 'Tenemos dashboards que combinan 2 capas con cierta correlación.', 5: 'Tenemos un dashboard unificado que correlaciona energía, cooling y workloads en tiempo real.' } },
  { type: 'scale', category: 'VISIBILIDAD CROSS-LAYER', question: '¿Qué tan detallada es tu telemetría?', key: 'P3', descriptions: { 1: 'No recopilamos datos de telemetría.', 2: 'Recopilamos métricas básicas (ej. temperatura ambiente, consumo total) con poca frecuencia.', 3: 'Telemetría moderada: métricas clave por zona con actualizaciones periódicas.', 4: 'Telemetría detallada por rack/equipo con actualizaciones cada pocos minutos.', 5: 'Telemetría granular a nivel de servidor/componente con datos en tiempo real e incluye Scope 1-2-3.' } },
  { type: 'scale', category: 'ATRIBUCIÓN DE FRICCIÓN', question: '¿Qué tan sincronizados están energía y workload?', key: 'P4', descriptions: { 1: 'No hay coordinación; energía y workloads operan de forma totalmente independiente.', 2: 'Coordinación mínima; se ajusta energía solo en emergencias o fallas.', 3: 'Coordinación reactiva; se hacen ajustes de energía después de que cambian los workloads.', 4: 'Coordinación proactiva; energía se ajusta anticipándose a cambios de carga planificados.', 5: 'Sincronización en tiempo real; el sistema de energía se adapta automáticamente a la demanda de workloads.' } },
  { type: 'scale', category: 'ATRIBUCIÓN DE FRICCIÓN', question: '¿Qué tan sincronizados están cooling y workload?', key: 'P5', descriptions: { 1: 'No hay coordinación; el cooling opera con configuración fija sin importar la carga.', 2: 'Coordinación mínima; se ajusta cooling solo ante alertas de temperatura crítica.', 3: 'Coordinación reactiva; se ajusta cooling después de detectar cambios térmicos.', 4: 'Coordinación proactiva; cooling se pre-ajusta según la carga esperada.', 5: 'Sincronización en tiempo real; el cooling se adapta dinámicamente a la carga térmica real de los workloads.' } },
  { type: 'scale', category: 'LATENCIA DE COORDINACIÓN', question: '¿Cuánto tarda la coordinación MANUAL entre teams?', key: 'P6', descriptions: { 1: 'Semanas: requiere reuniones, aprobaciones y tickets entre múltiples equipos.', 2: 'Días: hay procesos definidos pero lentos, con dependencias entre equipos.', 3: 'Horas: los equipos se comunican el mismo día, pero con fricción en la coordinación.', 4: 'Menos de una hora: hay canales directos y procesos ágiles entre equipos.', 5: 'Minutos: los equipos están co-ubicados o tienen protocolos de respuesta inmediata.' } },
  { type: 'scale', category: 'LATENCIA DE COORDINACIÓN', question: '¿Tienes semi-automatización?', key: 'P7', descriptions: { 1: 'Todo es 100% manual; no hay automatización en ningún proceso operativo.', 2: 'Automatización mínima; solo alertas automáticas, las acciones son manuales.', 3: 'Algunos procesos tienen scripts o runbooks semi-automáticos que requieren aprobación manual.', 4: 'La mayoría de procesos rutinarios están semi-automatizados con supervisión humana.', 5: 'Automatización avanzada con intervención humana solo para decisiones críticas o excepciones.' } },
  { type: 'scale', category: 'LATENCIA DE COORDINACIÓN', question: '¿Tienes automatización completa?', key: 'P8', descriptions: { 1: 'No hay automatización completa en ningún proceso.', 2: 'Solo tareas triviales están automatizadas (ej. backups, rotación de logs).', 3: 'Algunos flujos de provisioning o scaling tienen automatización end-to-end.', 4: 'La mayoría de operaciones rutinarias están completamente automatizadas con auto-remediación.', 5: 'Orquestación completa: provisioning, scaling, failover y optimización de recursos son 100% automáticos.' } },
  { type: 'scale', category: 'AUTO-CUANTIFICACIÓN', question: '¿Cuantificas tu PUE (Power Usage Effectiveness)?', key: 'P9', descriptions: { 1: 'No medimos ni conocemos nuestro PUE.', 2: 'Estimamos el PUE de forma aproximada, sin medición formal.', 3: 'Medimos el PUE periódicamente (mensual o trimestral) con datos parciales.', 4: 'Medimos el PUE continuamente y lo comparamos con benchmarks de la industria.', 5: 'Medimos PUE en tiempo real por zona/sala, con metas de optimización activas y tracking de tendencias.' } },
  { type: 'scale', category: 'AUTO-CUANTIFICACIÓN', question: '¿Sabes exactamente tu utilización real?', key: 'P10', descriptions: { 1: 'No medimos la utilización; desconocemos cuánta capacidad se usa realmente.', 2: 'Tenemos una idea general pero sin datos concretos ni métricas formales.', 3: 'Medimos utilización de CPU/memoria a nivel general, pero no identificamos capacidad desperdiciada.', 4: 'Medimos utilización por servidor/rack y conocemos nuestra capacidad ociosa.', 5: 'Medición granular en tiempo real con identificación precisa de stranded capacity y costos asociados.' } },
  { type: 'scale', category: 'BLOQUEANTES', question: '¿Tienes suficiente personal calificado?', key: 'P11', descriptions: { 1: 'Déficit crítico; no cubrimos las necesidades mínimas de operación.', 2: 'Personal insuficiente; dependemos de contratistas externos para operaciones básicas.', 3: 'Personal suficiente para operaciones normales, pero sin capacidad para proyectos de mejora.', 4: 'Personal adecuado con capacidad para operaciones y algunos proyectos de innovación.', 5: 'Equipo completo y especializado, con capacidad para operar, innovar y formar talento.' } },
  { type: 'scale', category: 'BLOQUEANTES', question: '¿Hay retrasos en cadena de suministro?', key: 'P12', descriptions: { 1: 'Retrasos severos (+6 meses); afectan la operación y expansión frecuentemente.', 2: 'Retrasos significativos (3-6 meses); impactan la planificación de capacidad.', 3: 'Retrasos moderados (1-3 meses); manejables pero requieren planificación anticipada.', 4: 'Retrasos menores (<1 mes); rara vez impactan las operaciones.', 5: 'Sin retrasos relevantes; cadena de suministro diversificada y con stock de respaldo.' } },
  { type: 'scale', category: 'BLOQUEANTES', question: '¿Hay restricciones de la red eléctrica?', key: 'P13', descriptions: { 1: 'Restricciones severas; la red limita la operación actual y no hay alternativas.', 2: 'Restricciones significativas; hay cortes frecuentes o límites de capacidad cercanos.', 3: 'Restricciones moderadas; la red es estable pero sin margen para crecimiento.', 4: 'Pocas restricciones; red estable con margen de crecimiento razonable.', 5: 'Sin restricciones; red eléctrica confiable con capacidad amplia y/o fuentes renovables propias.' } },
  { type: 'scale', category: 'BLOQUEANTES', question: '¿Hay restricciones regulatorias?', key: 'P14', descriptions: { 1: 'Restricciones severas que bloquean expansión o requieren cambios operativos mayores.', 2: 'Restricciones significativas que limitan opciones de crecimiento o tecnología.', 3: 'Restricciones moderadas; cumplimos la normativa pero limita algunas decisiones.', 4: 'Pocas restricciones; la regulación es clara y no impide nuestros planes.', 5: 'Entorno regulatorio favorable; las normativas apoyan nuestra operación y expansión.' } },
  { type: 'scale', category: 'EXPERTISE INTERNA', question: '¿Tienes expertise interna?', key: 'P15', descriptions: { 1: 'No hay expertise especializado; dependemos completamente de proveedores externos.', 2: 'Expertise básico; el equipo maneja operaciones rutinarias pero no puede resolver problemas complejos.', 3: 'Expertise moderado; el equipo resuelve la mayoría de problemas pero necesita apoyo externo para temas avanzados.', 4: 'Expertise sólido; el equipo maneja temas avanzados con apoyo externo solo en casos excepcionales.', 5: 'Expertise completo; el equipo lidera innovación, capacita a otros y no depende de apoyo externo.' } }
];

let currentStepIndex = -1;
const userAnswers = {};
let currentTheme = localStorage.getItem('benchmarkTheme') || 'light';
const stepCounterEl = document.getElementById('stepCounter');
const progressBarContainer = document.getElementById('progressBarContainer');
const cardContainer = document.getElementById('cardContainer');

function initApp() {
  applyTheme(currentTheme);
  setupThemeButtons();
  renderStep();
}

function setupThemeButtons() {
  const lightBtn = document.getElementById('themeBtnLight');
  const darkBtn = document.getElementById('themeBtnDark');
  if (lightBtn) lightBtn.onclick = () => setTheme('light');
  if (darkBtn) darkBtn.onclick = () => setTheme('dark');
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('benchmarkTheme', theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function renderProgressBar() {
  progressBarContainer.innerHTML = '';
  if (currentStepIndex < 0) return;

  for (let i = 0; i < 15; i++) {
    const seg = document.createElement('div');
    seg.className = `progress-segment ${i <= currentStepIndex ? 'active' : ''}`;
    progressBarContainer.appendChild(seg);
  }
}

function renderIntro() {
  cardContainer.innerHTML = `
    <div class="intro-layout">
      <div class="intro-card">
        <div class="intro-visual">
          <div class="orb orb-one"></div>
          <div class="orb orb-two"></div>
          <div class="mini-board">
            <span>Estado</span>
            <div class="mini-bars">
              <i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>

        <div class="intro-content">
          <div class="brand-title">BENCHMARK<span class="dot">•</span>DC</div>
          <div class="intro-kicker">MOTOR DE BENCHMARK • DATA CENTERS</div>

          <h1 class="intro-title">¿Cuánta capacidad estás pagando sin usar?</h1>

          <p class="intro-text">
            Este diagnóstico mide qué tan coordinadas están las capas de energía, cooling y workloads en tu facility.
            A cambio de tus respuestas, recibes tu posición relativa frente al resto de la industria — un dato que hoy
            no existe en ningún otro lugar.
          </p>

          <div class="meta-list">
            <div class="meta-pill">15 preguntas</div>
            <div class="meta-pill">~8 minutos</div>
            <div class="meta-pill">5 dimensiones</div>
          </div>

          <div class="security-row">🔒 ANONIMATO GARANTIZADO</div>

          <p class="privacy-copy">
            No te pedimos tu nombre, tu empresa, ni ningún dato que te identifique...
          </p>

          <label class="consent-row">
            <input type="checkbox" id="consentCheck" />
            <span>Entiendo que este diagnóstico es anónimo y acepto participar.</span>
          </label>

          <div class="cta-row">
            <button class="cta-button" onclick="startBenchmark()">Comenzar diagnóstico →</button>
          </div>

          <div class="mini-meta">DIAGNÓSTICO ANÓNIMO • ~8 MIN</div>
        </div>
      </div>
    </div>
  `;
}

function startBenchmark() {
  const consent = document.getElementById('consentCheck');
  if (!consent || consent.checked) {
    currentStepIndex = 0;
    renderStep();
  }
}

function renderStep() {
  renderProgressBar();

  if (currentStepIndex === -1) {
    if (stepCounterEl) stepCounterEl.textContent = '';
    renderIntro();
    return;
  }

  if (currentStepIndex >= stepsData.length) {
    renderResults();
    return;
  }

  const stepNum = String(currentStepIndex + 1).padStart(2, '0');
  if (stepCounterEl) stepCounterEl.textContent = `PASO ${stepNum} / 15`;

  const data = stepsData[currentStepIndex];
  renderScaleStep(data);
}

function renderScaleStep(data) {
  const selectedVal = userAnswers[data.key] || null;
  const descText = selectedVal ? data.descriptions[selectedVal] : 'Selecciona una opción del 1 al 5';

  cardContainer.innerHTML = `
    <div class="question-shell">
      <div class="category-tag">${data.category}</div>
      <h2 class="question-title">${data.question}</h2>

      <div class="scale-container">
        ${[1, 2, 3, 4, 5].map(num => `
          <button class="scale-box ${selectedVal === num ? 'selected' : ''}" onclick="selectScaleOption('${data.key}', ${num})">
            ${num}
          </button>
        `).join('')}
      </div>

      <div class="description-box" id="descBox">${descText}</div>

      <div class="nav-buttons">
        <button class="btn-back" onclick="prevStep()">← Atrás</button>
        <button class="btn-next" onclick="nextStep()" ${!selectedVal ? 'disabled' : ''}>Siguiente →</button>
      </div>
    </div>
  `;
}

function selectScaleOption(key, value) {
  userAnswers[key] = value;
  renderStep();
}

function nextStep() {
  if (currentStepIndex >= 0 && currentStepIndex < stepsData.length) {
    const data = stepsData[currentStepIndex];
    if (!userAnswers[data.key]) return;
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

function getScoreSummary() {
  const groups = [
    { name: 'Visibilidad', keys: ['P1', 'P2', 'P3'] },
    { name: 'Fricción', keys: ['P4', 'P5'] },
    { name: 'Coordinación', keys: ['P6', 'P7', 'P8'] },
    { name: 'Cuantificación', keys: ['P9', 'P10'] },
    { name: 'Bloqueantes', keys: ['P11', 'P12', 'P13', 'P14'] },
    { name: 'Expertise', keys: ['P15'] }
  ];

  const values = groups.map(group => {
    const sum = group.keys.reduce((acc, key) => acc + (Number(userAnswers[key]) || 0), 0);
    const avg = (sum / group.keys.length) * 20;
    return { ...group, value: avg };
  });

  const finalScore = Math.round(values.reduce((acc, item) => acc + item.value, 0) / values.length);
  const weakest = [...values].sort((a, b) => a.value - b.value)[0];

  return { values, finalScore, weakest };
}

function renderResults() {
  const { values, finalScore, weakest } = getScoreSummary();
  const summaryBars = values.map(item => `
    <div class="bar-row">
      <div class="bar-label">${item.name}</div>
      <div class="bar-track"><span class="bar-fill" style="width:${Math.min(item.value, 100)}%"></span></div>
      <div class="bar-value">${Math.round(item.value)}%</div>
    </div>
  `).join('');

  const answers = [
    { label: 'P1: ¿Tienes herramientas para monitorear energía, cooling y workloads?', value: userAnswers.P1 || 'No respondido' },
    { label: 'P2: ¿Tienes dashboards que unifiquen las 3 capas?', value: userAnswers.P2 || 'No respondido' },
    { label: 'P3: ¿Qué tan detallada es tu telemetría?', value: userAnswers.P3 || 'No respondido' },
    { label: 'P4: ¿Qué tan sincronizados están energía y workload?', value: userAnswers.P4 || 'No respondido' },
    { label: 'P5: ¿Qué tan sincronizados están cooling y workload?', value: userAnswers.P5 || 'No respondido' },
    { label: 'P6: ¿Cuánto tarda la coordinación MANUAL entre teams?', value: userAnswers.P6 || 'No respondido' },
    { label: 'P7: ¿Tienes semi-automatización?', value: userAnswers.P7 || 'No respondido' },
    { label: 'P8: ¿Tienes automatización completa?', value: userAnswers.P8 || 'No respondido' },
    { label: 'P9: ¿Cuantificas tu PUE (Power Usage Effectiveness)?', value: userAnswers.P9 || 'No respondido' },
    { label: 'P10: ¿Sabes exactamente tu utilización real?', value: userAnswers.P10 || 'No respondido' },
    { label: 'P11: ¿Tienes suficiente personal calificado?', value: userAnswers.P11 || 'No respondido' },
    { label: 'P12: ¿Hay retrasos en cadena de suministro?', value: userAnswers.P12 || 'No respondido' },
    { label: 'P13: ¿Hay restricciones de la red eléctrica?', value: userAnswers.P13 || 'No respondido' },
    { label: 'P14: ¿Hay restricciones regulatorias?', value: userAnswers.P14 || 'No respondido' },
    { label: 'P15: ¿Tienes expertise interna?', value: userAnswers.P15 || 'No respondido' }
  ];

  const answerRows = answers.map(item => `
    <div class="answer-row">
      <div class="answer-label">${item.label}</div>
      <div class="answer-value">${item.value}</div>
    </div>
  `).join('');

  cardContainer.innerHTML = `
    <div class="results-shell">
      <div class="results-header-row">
        <div>
          <div class="results-kicker">RESULTADOS</div>
          <h1 class="results-title">¡Gracias por completar el diagnóstico!</h1>
        </div>
        <div class="score-pill">Score ${finalScore}/100</div>
      </div>

      <div class="results-grid">
        <div class="score-panel">
          <div class="score-ring" style="--score: ${finalScore};">
            <div class="score-ring-inner">
              <strong>${finalScore}%</strong>
              <span>SCORE</span>
            </div>
          </div>
        </div>

        <div class="stats-panel">
          <div class="stat-box accent-green">
            <small>Madurez</small>
            <strong>${finalScore}%</strong>
          </div>
          <div class="stat-box accent-cyan">
            <small>Data center</small>
            <strong>Facility</strong>
          </div>
          <div class="stat-box accent-gold">
            <small>Mayor fricción</small>
            <strong>${weakest.name}</strong>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <h3>Perfil por dimensión</h3>
        <div class="bars-panel">${summaryBars}</div>
      </div>

      <div class="insight-banner">
        <span>Insight clave</span>
        Tu mayor fricción está en <strong>${weakest.name}</strong>. Eso es lo que más limita la capacidad operativa y la eficiencia del facility.
      </div>

      <div class="panel-block">
        <h3>Resumen de respuestas</h3>
        <div class="answers-panel">${answerRows}</div>
      </div>

      <button class="restart-btn" onclick="restartBenchmark()">Volver al inicio</button>
      <div class="mini-meta">DIAGNÓSTICO ANÓNIMO • ~8 MIN</div>
    </div>
  `;
}

function restartBenchmark() {
  currentStepIndex = -1;
  for (const key in userAnswers) delete userAnswers[key];
  renderStep();
}

document.addEventListener('DOMContentLoaded', initApp);