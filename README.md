# ⚡ BENCHMARK.DC — Frontend

> **Single Page Application (SPA)** para la evaluación y diagnóstico de la madurez operativa en Data Centers.

---

## 📌 ¿De qué trata este proyecto?

**BENCHMARK.DC** es una herramienta web interactiva diseñada para guiar al usuario a través de un cuestionario dinámico que evalúa la madurez y eficiencia operativa de su infraestructura.

A través de **15 preguntas clave**, la aplicación analiza distintas dimensiones operativas y genera un **informe final** con un score global y la detección del área con mayor fricción.

---

## ✨ Características Principales

- 🎯 **Diagnóstico por Pasos:** Cuestionario interactivo con escala de evaluación del 1 al 5.
- 📊 **Análisis en Tiempo Real:** Cálculo automático de score global (0–100%) y desglose por dimensión.
- 🔍 **Detección de Fricción:** Identifica el punto más débil de la operación actual.
- 🌙 **Modo Claro / Oscuro:** Cambio de tema visual que se guarda automáticamente en la sesión del navegador.
- ⚡ **SPA Ligera:** Desarrollado en JavaScript Vanilla, sin frameworks ni librerías pesadas.

---

## 📁 Estructura del Proyecto

S07-26-Team-21-frontend/
├── README.md
└── benchmark_dc_frontend/
    ├── index.html        # Estructura semántica base
    ├── styles.css        # Estilos visuales, temas y responsive design
    ├── script.js         # Lógica del cuestionario, cálculo de score y renderizado
    ├── package.json      # Dependencias y scripts de desarrollo
    └── README.md

## 🚀 Cómo Ejecutarlo Localmente
Elige la opción que mejor se adapte a tu entorno de trabajo:

##🔹 Opción 1: Con Vite (Recomendada)
Requisito: Tener instalado Node.js (v18 o superior).

# 1. Ingresa a la carpeta del proyecto
cd benchmark_dc_frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

🌐 La app se abrirá en http://localhost:5173

##🔹 Opción 2: Con Servidor Simple de Python
Ideal para pruebas rápidas sin usar Node.js.

# 1. Ingresa a la carpeta del proyecto
cd benchmark_dc_frontend

# 2. Levanta el servidor local
python3 -m http.server 8000

🌐 Abre en tu navegador: http://localhost:8000

## ⚙️ Requisitos
Node.js (v18+) y npm

Navegador web moderno (Chrome, Firefox, Edge, Safari)

Python 3 (opcional, solo para la opción 2)

## 🔄 Flujo de Navegación

[Inicio] ➔ [Aceptar Anonimato] ➔ [Cuestionario 15 Pasos] ➔ [Resumen de Score & Fricción]

Inicio: Presentación de los objetivos y tiempo estimado.

Evaluación: Selección de respuesta (1 al 5) con actualización de progreso en tiempo real.

Resultados: Vista tipo Dashboard con gráfico de anillo, resumen porcentual y desglose detallado.

## 🛠️ Verificación y Sintaxis
Para comprobar que el código JavaScript no tenga errores antes de subir cambios:

node --check script.js

### 📋 Pasos en GitHub:
1. En el editor de GitHub haz clic adentro, presiona `Ctrl + A` (o `Cmd + A`) y luego `Borrar`.
2. Copia todo el bloque de arriba (usa el botón de **Copiar** del recuadro).
3. Pégalo en el editor de GitHub.
4. Presiona la pestaña **Preview** arriba para confirmar que todo cambió de gris a blanco correctamente.
