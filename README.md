# ⚡ BENCHMARK.DC — Frontend

> **Single Page Application (SPA)** interactiva para la evaluación y diagnóstico de la madurez operativa en Data Centers.

---

## 📌 ¿De qué trata este proyecto?

**BENCHMARK.DC** es una herramienta web que guía al usuario a través de un cuestionario dinámico para diagnosticar el estado actual de la infraestructura de su Data Center.

A través de **15 preguntas clave**, la aplicación evalúa diferentes dimensiones operativas y entrega un **informe final** con un *score* general y la detección del área con mayor fricción.

---

## ✨ Características Principales

| Función | Descripción |
| :--- | :--- |
| 🎯 **Diagnóstico por Pasos** | Cuestionario interactivo con escala de evaluación del 1 al 5. |
| 📊 **Análisis en Tiempo Real** | Generación de score global (0-100%) y desglose por dimensión. |
| 🔍 **Detección de Fricción** | Identifica automáticamente el punto más débil de la operación. |
| 🌙 **Modo Claro / Oscuro** | Soporte nativo de temas visuales que se guardan en el navegador. |
| ⚡ **SPA Ligera** | Desarrollado en JavaScript Vanilla, sin dependencias pesadas ni frameworks extra. |

---

## 📁 Estructura del Proyecto

```text
S07-26-Team-21-frontend/
├── README.md
└── benchmark_dc_frontend/
    ├── index.html        # Estructura semántica base
    ├── styles.css        # Estilos visuales, temas y diseño responsivo
    ├── script.js        # Lógica del cuestionario, cálculo de score y renderizado
    ├── package.json      # Dependencias y scripts de desarrollo
    └── README.md
🚀 Cómo Ejecutarlo Localmente
Elige la opción que mejor se adapte a tu entorno:

🔹 Opción 1: Con Vite (Recomendada)
Requiere tener instalado Node.js.

Bash
# 1. Ingresa a la carpeta del frontend
cd benchmark_dc_frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
🌐 La app se abrirá en http://localhost:5173

🔹 Opción 2: Con servidor simple de Python
Si prefieres no usar npm, puedes levantar un servidor HTTP estático:

Bash
cd benchmark_dc_frontend
python3 -m http.server 8000
🌐 Abre tu navegador en http://localhost:8000

⚙️ Requisitos
Node.js (v18 o superior) y npm

Navegador web moderno (Chrome, Firefox, Edge, Safari)

Python 3 (opcional, solo para la Opción 2)

🔄 Flujo de Uso
Plaintext
[Inicio] ──> [Aceptar Anonimato] ──> [Cuestionario 15 Pasos] ──> [Resumen de Score & Fricción]
Inicio: Explicación general y tiempo estimado.

Evaluación: Selección de escala (1 al 5) con retroalimentación visual inmediata.

Resultados: Vista tipo Dashboard con gráfico de anillo, desglose por categorías y lista de respuestas.

🛠️ Mantenimiento y Verificación
Para comprobar que el archivo JavaScript no tenga errores de sintaxis:

Bash
node --check script.js
💡 Este frontend es una versión funcional tipo prototipo/benchmark, lista para ser integrada con APIs backend de cálculo avanzado o exportación de reportes.