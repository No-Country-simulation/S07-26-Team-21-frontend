# ⚡ BENCHMARK·DC — Frontend (React + TypeScript)

Aplicación web interactiva para el **Diagnóstico y Benchmark de Madurez Operativa de Centros de Datos**. Permite a operadores de data centers evaluar sus niveles de eficiencia, visibilidad, latencia, atribución de fricción y bloqueantes operativos, obteniendo diagnósticos comparativos frente a la industria enriquecidos con Inteligencia Artificial.

---

## 🛠️ Stack Tecnológico

* **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Bundler & Dev Server:** [Vite 6](https://vite.dev/)
* **Gestor de Paquetes:** [pnpm](https://pnpm.io/)
* **Cliente HTTP:** [Axios](https://axios-http.com/) (con timeout extendido para inferencia LLM)
* **Iconos & Animaciones:** [Lucide React](https://lucide.dev/) + CSS Keyframes puros

---

## 🚀 Inicio Rápido

### 1. Requisitos Previos
* Node.js v18+ 
* `pnpm` instalado (`npm install -g pnpm`)

### 2. Instalación de Dependencias
```bash
cd frontend
pnpm install
```

### 3. Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz de `frontend/` (puedes guiarte con `.env.example`):
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Ejecución en Modo Desarrollo
```bash
pnpm dev
```
La aplicación estará disponible en `http://localhost:5173`.

### 5. Build de Producción
```bash
pnpm build
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── .env.example
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── benchmark.ts          # Contratos TypeScript alineados con FastAPI
│   ├── services/
│   │   ├── api.ts                # Instancia de Axios con interceptores
│   │   └── benchmarkService.ts   # Conexión con endpoints POST /submit y GET /stats
│   ├── context/
│   │   ├── ThemeContext.tsx      # Modo oscuro / claro con persistencia
│   │   └── BenchmarkContext.tsx  # Estado global de respuestas y flujo
│   ├── constants/
│   │   ├── questions.ts          # 15 preguntas Likert (1-5) y descripciones
│   │   └── dimensions.ts         # Metadatos y perfiles cualitativos
│   └── components/
│       ├── layout/               # Header, Footer, ProgressBar
│       ├── intro/                # IntroCard, OrbVisual (Telemetría en vivo), FacilityForm
│       ├── survey/               # QuestionCard, ScaleSelector, NavButtons
│       ├── results/              # ResultsDashboard, ScoreRing, StatsGrid, DimensionBars, InsightBanner, PeerComparison, Narratives, CertificationSeal
│       └── common/               # LoadingOverlay, ErrorBanner
```

---

## 🌐 Integración con el Backend (FastAPI)

* **`POST /api/v1/benchmark/submit`:** Envía las 15 respuestas Likert, `facility_size` y `region`, recibiendo percentiles, debilidad crítica, prácticas del cuartil superior, comparativa de peers y recomendaciones de IA.
* **`GET /api/v1/benchmark/stats`:** Alimenta el panel de telemetría global en vivo en la pantalla de bienvenida con las estadísticas acumuladas de la plataforma.
