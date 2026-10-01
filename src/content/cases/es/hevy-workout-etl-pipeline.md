---
locale: es
slug: hevy-workout-etl-pipeline
order: 6
title: Hevy Workout ETL
eyebrow: Data Product
description: Un producto resiliente desde la API hasta el dashboard que protege el historial de entrenamientos, promueve outputs Medallion confiables y muestra progresión en una aplicación interactiva.
role: Ingesta de API · modelos Medallion · dashboard
year: 2026
dataKind: generated
dataLabel: Snapshot personal de entrenamientos versionado
question: ¿Cómo mantener un dataset respaldado por API completo, reproducible y útil cuando la extracción falla a mitad?
repoUrl: https://github.com/J0BS013/hevy-workout-etl-pipeline
demoUrl: https://hevy-workout-dashboard-j0bs013.streamlit.app/
image: /images/projects/hevy-workout-etl-pipeline.png
socialImage: /social/hevy-workout-etl-pipeline.png
imageAlt: Dashboard Hevy Workout Analytics con frecuencia, volumen, progresión y consistencia.
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
  - Snapshot personal versionado; la app pública no requiere acceso a la API privada.
---

## Qué es este proyecto

El proyecto convierte el historial de la API Hevy en un producto analítico durable. Es un sistema ETL y también algo concreto para usar: un dashboard Streamlit con cuatro pestañas para frecuencia, volumen, progresión por ejercicio y consistencia estadística.

La app pública lee outputs Gold y Analytics confirmados en Git. Nunca necesita la credencial privada de la API, lo que mantiene seguro el deploy y reproducible la demostración.

## El problema de confiabilidad

Las APIs paginadas pueden fallar después de varias páginas exitosas. Guardar esa respuesta parcial como nuevo snapshot borraría silenciosamente el historial y produciría gráficos convincentes pero incorrectos. La extracción solo devuelve éxito cuando todas las páginas terminan.

Cada página obligatoria tiene timeout de 15 segundos. Solo rate limits, errores de servidor y timeouts se reintentan con backoff exponencial; autenticación y errores no recuperables fallan inmediatamente. Los nuevos Parquet se promueven atómicamente, por lo que una escritura fallida preserva el último snapshot confiable.

## Arquitectura de datos

Bronze conserva el historial con la forma de la API. Silver estandariza tipos, valida claves y rechaza registros inválidos. Gold produce hechos de entrenamiento, ejercicio y grupo muscular en granos documentados. Analytics deriva volumen semanal, récords, tendencias y medidas de consistencia.

El dashboard consume solo Gold y Analytics. Esta frontera separa presentación e ingestión y permite que las pruebas validen las mismas tablas que ve el usuario.

## Resultados y validación

El snapshot publicado contiene 510 entrenamientos desde octubre de 2023 hasta marzo de 2026 y 4,33 millones de kilogramos de volumen registrado. La capa analítica evalúa 99 historiales de ejercicios; 49 muestran una tendencia temporal estadísticamente significativa bajo la regla OLS definida.

La interfaz ofrece Overview, Volume, Progression y Analytics. Los filtros cambian la ventana de revisión sin alterar el snapshot original. Cincuenta y seis pruebas automatizadas cubren API, transformaciones, calidad y analytics sin llamar al servicio en vivo.

## Capa estadística

La progresión se estima por ejercicio con mínimos cuadrados ordinarios a lo largo del tiempo. Cada output incluye pendiente, R², p-valor y flag de significancia en p < 0,05. Tendencia semanal de volumen, récords y coeficiente de variación complementan la lectura sin resumir el progreso en una sola nota.

Estas estadísticas describen el historial registrado. No prueban que un programa haya causado un cambio ni que toda pendiente significativa sea relevante en la práctica.

## Decisión de diseño

Descarté una app que consultara la API en cada apertura. Acoplaría la disponibilidad a un tercero, arriesgaría credenciales y haría cambiar el resultado sin una frontera versionada. También descarté CSV como contrato porque pierde tipos importantes entre capas.

El diseño elegido hace explícita la freshness. Un repositorio verde indica código probado y snapshot versionado saludable; no implica ingestión continua de nuevos entrenamientos privados.

## Cómo interpretar el dashboard

El dashboard describe un historial de entrenamiento versionado; es un producto analítico, no una recomendación de fitness. OLS no atribuye cambios al programa y puede reflejar lesiones o sustituciones. La ingesta privada programada puede actualizar el snapshot mientras el deploy publica solo agregados anónimos, manteniendo datos brutos y credenciales fuera de la app pública.
