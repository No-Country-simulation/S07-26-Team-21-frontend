# BENCHMARK.DC Frontend

Benchmark DC es una Single Page Application (SPA) para evaluar la madurez operativa de un data center. La aplicación guía al usuario a través de una serie de preguntas sobre contexto y operación, y al final entrega un resumen con las respuestas del diagnóstico.

## ¿Qué hace esta app?

La aplicación permite:

- Mostrar una pantalla de inicio con información del diagnóstico.
- Recopilar respuestas sobre el facility y su contexto.
- Evaluar distintas dimensiones del data center mediante preguntas tipo escala del 1 al 5.
- Mostrar el avance del usuario por pasos.
- Guardar las respuestas en memoria.
- Mostrar un resumen final con las respuestas elegidas.
- Reiniciar el diagnóstico desde el inicio.

## Diseño actual

El proyecto mantiene una estética tipo benchmark de diagnóstico, con:

- fondo claro y limpio,
- texto grande y fuerte,
- esquema minimalista,
- botones y pills simples,
- enfoque en legibilidad y flujo del cuestionario.

## Estructura del proyecto

```text
S07-26-Team-21-frontend/
├── README.md
└── benchmark_dc_frontend/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── README.md
```

## Archivos principales

- `benchmark_dc_frontend/index.html`: estructura base del proyecto.
- `benchmark_dc_frontend/styles.css`: estilos visuales y diseño general.
- `benchmark_dc_frontend/script.js`: lógica del cuestionario, navegación y resumen final.

## Cómo ejecutarlo localmente

### Opción recomendada: con Vite (`npm run dev`)

Desde la carpeta del proyecto:

```bash
cd /workspaces/S07-26-Team-21-frontend/benchmark_dc_frontend
npm install
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

### Opción alternativa: servidor simple de Python

```bash
cd /workspaces/S07-26-Team-21-frontend/benchmark_dc_frontend
python3 -m http.server 8000
```

Y luego abre:

```text
http://localhost:8000
```

## Requisitos

- Node.js y npm instalados
- Navegador moderno
- Python 3 (opcional, si usas el servidor simple)
- Internet opcional, si deseas usar fuentes externas

## Cómo funciona el flujo

1. La app carga la pantalla de inicio.
2. El usuario acepta participar.
3. Comienza el diagnóstico con preguntas de contexto.
4. Se muestran las preguntas de evaluación por pasos.
5. El usuario selecciona su respuesta y avanza.
6. Al terminar, aparece la pantalla final con un resumen de las respuestas.

## Observación

Este frontend es una versión funcional de benchmark y prototipo visual. La lógica está lista para continuar creciendo con backend, cálculo de score real, recomendaciones personalizadas y dashboard más avanzado.

## Comandos útiles

```bash
cd /workspaces/S07-26-Team-21-frontend/benchmark_dc_frontend
npm install
npm run dev
```

Y para verificar la sintaxis JavaScript:

```bash
node --check script.js
```

## Estado actual

- Frontend funcional
- Navegación entre pasos correcta
- Diseño adaptado a la estructura de las capturas
- Ejecutable localmente con servidor simple
