# ⚡ BENCHMARK.DC — Frontend

![Version](https://img.shields.io/badge/version-1.0.0-22d3ee?style=for-the-badge)
![UI](https://img.shields.io/badge/UI-Dark_Mode-34d399?style=for-the-badge)
![JS](https://img.shields.io/badge/JavaScript-Vanilla-f59e0b?style=for-the-badge)

Una Single Page Application (SPA) interactiva diseñada para evaluar la madurez de Data Centers mediante un cuestionario por pasos y la generación instantánea de un dashboard técnico.

---

## 📸 Funcionalidades de la Aplicación

La aplicación web guía al usuario a través de un flujo interactivo y dinámico:

### 1. Formulario Interactivo por Pasos (SPA)
* **Barra de Progreso Segmentada:** Indicador visual superior divididos en 14 segmentos que se actualiza en tiempo real según el avance.
* **Selección Inteligente:**
  * **Opciones Contextuales (Pills):** Selección intuitiva de datos de contexto (tamaño, tipo de facility y región).
  * **Escala Numérica (1 a 5):** Botones con feedback visual que muestran una descripción detallada según la puntuación elegida.
* **Navegación Fluida:** Botones de navegación con validación para impedir avanzar si no se ha seleccionado una respuesta.

### 2. Dashboard de Resultados Dinámico
* **Gráfico de Arco (Gauge SVG):** Muestra el percentil general del facility con un gradiente multicolor dinámico.
* **Métrica Destacada:** Tarjeta de resumen con el PUE estimado comparado contra el promedio global de la industria.
* **Barras de Dimensiones:** Desglose visual de las 5 áreas clave con barras de progreso animadas.
* **Detección Automática de Cuellos de Botella:** Al finalizar, el código calcula dinámicamente el área con menor puntuación y la resalta con una alerta visual de advertencia.
* **Modo Demo / Reinicio:** Botón para reiniciar el cuestionario y limpiar los estados seleccionados.

---

## 🛠️ Stack Tecnológico

* **HTML5:** Estructura semántica accesible para Single Page Application.
* **CSS3:** Estilos en *Dark Mode Industrial*, variables CSS, layout con Flexbox/Grid y animaciones fluidas para barras y gráficos.
* **Vanilla JavaScript (ES6+):** Lógica client-side nativa para renderizado dinámico del DOM, gestión del estado de respuestas y cálculo de percentiles (sin frameworks ni dependencias externas).

---

## 📁 Estructura del Proyecto

```text
frontend/
├── index.html     # Contenedor principal de la SPA y layout
├── styles.css     # Estilos globales, paleta Dark Mode y componentes
├── script.js     # Motor de renderizado, preguntas P1-P15 y dashboard
└── README.md      # Documentación del proyecto
