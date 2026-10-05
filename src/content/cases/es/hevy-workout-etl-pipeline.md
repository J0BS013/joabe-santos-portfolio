---
locale: es
slug: hevy-workout-etl-pipeline
order: 6
title: ETL de Entrenamientos de Hevy
eyebrow: Data Product
description: Un producto de datos resistente a fallos que protege el historial de entrenamientos, genera capas Medallion confiables y muestra la progresión en una aplicación interactiva.
role: Ingesta de API · modelos Medallion · panel
year: 2026
dataKind: generated
dataLabel: Historial personal de entrenamientos versionado
question: ¿Cómo mantener completos, reproducibles y útiles los datos obtenidos de una API cuando la extracción falla a mitad?
repoUrl: https://github.com/J0BS013/hevy-workout-etl-pipeline
demoUrl: https://hevy-workout-dashboard-j0bs013.streamlit.app/
image: /images/projects/hevy-workout-etl-pipeline.png
socialImage: /social/hevy-workout-etl-pipeline.png
imageAlt: Panel de Hevy Workout Analytics con frecuencia, volumen, progresión y consistencia.
sourceCommit: 5618eb64288cc15af1accc0203d7cdd1955783ce
evidence:
  - label: Entrenamientos versionados
    value: "510"
  - label: Período histórico
    value: "2023–2026"
  - label: Modelos analíticos
    value: "99 ejercicios"
  - label: Pruebas automatizadas
    value: "56"
scope:
  - Historial personal versionado; la aplicación pública no requiere acceso a la API privada.
---

## Qué es este proyecto

El proyecto convierte el historial de la API de Hevy en un producto analítico duradero. Es un sistema ETL y también algo concreto para usar: un panel en Streamlit con cuatro pestañas para frecuencia, volumen, progresión por ejercicio y consistencia estadística.

La aplicación pública lee resultados de las capas Gold y Analytics versionados en Git. Nunca necesita la credencial privada de la API, lo que mantiene segura la publicación y hace reproducible la demostración.

## El problema de confiabilidad

Las API paginadas pueden fallar después de varias páginas correctas. Guardar esa respuesta parcial como un nuevo historial borraría silenciosamente los datos anteriores y produciría gráficos convincentes pero incorrectos. La extracción solo devuelve éxito cuando todas las páginas terminan.

Cada página obligatoria tiene un límite de 15 segundos. Solo los límites de solicitudes, los errores de servidor y los tiempos de espera se reintentan con pausas crecientes; los errores de autenticación y otros errores no recuperables fallan de inmediato. Los nuevos archivos Parquet se publican de forma atómica, por lo que una escritura fallida conserva el último historial confiable.

## Arquitectura de datos

Bronze conserva el historial con la estructura de la API. Silver estandariza tipos, valida claves y rechaza registros inválidos. Gold produce datos de entrenamiento, ejercicio y grupo muscular con niveles de detalle documentados. Analytics deriva volumen semanal, récords, tendencias y medidas de consistencia.

El panel consume solo Gold y Analytics. Esta frontera separa la presentación de la ingesta y permite que las pruebas validen las mismas tablas que ve el usuario.

## Resultados y validación

El historial publicado contiene 510 entrenamientos desde octubre de 2023 hasta marzo de 2026 y 4,33 millones de kilogramos de volumen registrado. La capa analítica evalúa 99 historiales de ejercicios; 49 muestran una tendencia temporal estadísticamente significativa bajo la regla de regresión definida.

La interfaz ofrece las vistas Resumen, Volumen, Progresión y Análisis. Los filtros cambian el periodo de revisión sin alterar el historial original. Cincuenta y seis pruebas automatizadas cubren la API, las transformaciones, la calidad y los cálculos analíticos sin llamar al servicio en vivo.

## Capa estadística

La progresión se estima por ejercicio con mínimos cuadrados ordinarios a lo largo del tiempo. Cada resultado incluye pendiente, R², valor p y un indicador de significancia cuando p < 0,05. La tendencia semanal de volumen, los récords y el coeficiente de variación complementan la lectura sin resumir el progreso en una sola nota.

Estas estadísticas describen el historial registrado. No prueban que un programa haya causado un cambio ni que toda pendiente significativa sea relevante en la práctica.

## Decisión de diseño

Descarté una app que consultara la API en cada apertura. Acoplaría la disponibilidad a un tercero, arriesgaría credenciales y haría cambiar el resultado sin una frontera versionada. También descarté CSV como contrato porque pierde tipos importantes entre capas.

El diseño elegido hace explícita la fecha de actualización. Un repositorio con pruebas aprobadas indica que el código y el historial versionado son válidos; no implica la ingesta continua de nuevos entrenamientos privados.

## Cómo interpretar el panel

El panel describe un historial de entrenamiento versionado; es un producto analítico, no una recomendación de actividad física. La regresión no atribuye los cambios al programa y puede reflejar lesiones o sustituciones de ejercicios. Una ingesta privada programada puede actualizar el historial mientras la aplicación pública muestra solo agregados anónimos, manteniendo los datos originales y las credenciales fuera de la demostración.
