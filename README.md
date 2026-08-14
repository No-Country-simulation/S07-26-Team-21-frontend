⚡ BENCHMARK.DC — Frontend
Single Page Application (SPA) interactiva para la evaluación y diagnóstico de la madurez operativa en Data Centers.

📌 ¿De qué trata este proyecto?
BENCHMARK.DC es una herramienta web interactiva que guía al usuario a través de un cuestionario dinámico para diagnosticar la madurez de su infraestructura.

A través de 15 preguntas clave, la aplicación evalúa distintas dimensiones operativas y genera un informe final con un score global y la detección del área con mayor fricción.

✨ Características Principales
🎯 Diagnóstico por Pasos: Cuestionario interactivo con escala de evaluación del 1 al 5.

📊 Análisis en Tiempo Real: Generación de score global (0–100%) y desglose por dimensión.

🔍 Detección de Fricción: Identifica automáticamente el punto más débil de la operación.

🌙 Modo Claro / Oscuro: Soporte nativo de temas visuales que se guardan en el navegador.

⚡ SPA Ligera: Desarrollado en JavaScript Vanilla, sin dependencias ni frameworks pesados.

📁 Estructura del Proyecto
README.md: Documentación principal de la raíz del repositorio.

benchmark_dc_frontend/

index.html: Estructura semántica base.

styles.css: Estilos visuales, temas y diseño responsivo.

script.js: Lógica del cuestionario, cálculo de score y renderizado.

package.json: Dependencias y scripts de desarrollo.

🚀 Cómo Ejecutarlo Localmente
🔹 Opción 1: Con Vite (Recomendada)
Requiere tener instalado Node.js.

Ingresa a la carpeta del frontend:
cd benchmark_dc_frontend

Instala las dependencias:
npm install

Inicia el servidor de desarrollo:
npm run dev

🌐 La app se abrirá en http://localhost:5173 (o el puerto que te asigne la terminal).

🔹 Opción 2: Con Servidor Simple de Python
Si prefieres no usar Node.js:

Ingresa a la carpeta del proyecto:
cd benchmark_dc_frontend

Levanta el servidor local:
python3 -m http.server 8000

🌐 Abre tu navegador en http://localhost:8000

⚙️ Requisitos
Node.js (v18 o superior) y npm

Navegador web moderno (Chrome, Firefox, Edge, Safari)

Python 3 (opcional, solo si usas la Opción 2)

🔄 Flujo de Uso
[Inicio] ➔ [Aceptar Anonimato] ➔ [Cuestionario 15 Pasos] ➔ [Resumen de Score & Fricción]

Inicio: Explicación general y estimación de tiempo.

Evaluación: Selección de escala (1 al 5) con respuesta visual inmediata.

Resultados: Vista tipo Dashboard con gráfico de anillo, desglose por categorías y lista de respuestas.

🛠️ Verificación de Sintaxis
Para comprobar que el archivo JavaScript no tenga errores:

node --check script.js

💡 Este frontend es una versión funcional tipo prototipo/benchmark, lista para integrarse con APIs backend o módulos de exportación de reportes.