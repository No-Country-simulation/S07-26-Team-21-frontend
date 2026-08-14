# BENCHMARK.DC - Frontend Project

Este paquete contiene la implementación del frontend para el **Benchmark de Madurez de Data Centers**.

## ¿Qué hace esta app?

Es una SPA que guía al usuario a través de un diagnóstico sobre madurez operativa de un data center. El flujo incluye:

- pantalla de bienvenida,
- preguntas de contexto,
- preguntas de evaluación por escala del 1 al 5,
- avance por pasos,
- resumen final con respuestas.

## Archivos incluidos:
- `index.html`: Estructura base SPA.
- `styles.css`: Estilos visuales del diseño actual.
- `script.js`: Lógica del cuestionario y navegación.

## Cómo ejecutarlo

En la carpeta del proyecto:

```bash
cd /workspaces/S07-26-Team-21-frontend/benchmark_dc_frontend
python3 -m http.server 8000
```

Luego abre en tu navegador:

```text
http://localhost:8000
```

## Verificación rápida

```bash
node --check script.js
```

## Observación

Es una versión funcional y visual de prototipo para benchmark, con diseño en línea con las capturas entregadas y lista para seguir creciendo con nuevas pantallas y lógica de cálculo avanzado.
