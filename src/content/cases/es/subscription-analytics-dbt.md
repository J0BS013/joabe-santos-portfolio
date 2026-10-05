---
locale: es
slug: subscription-analytics-dbt
order: 2
title: Analítica de Suscripciones con dbt
eyebrow: Analytics Engineering
description: Un producto analítico con dbt y DuckDB que entrega MRR, NRR, cancelación y cohortes reconciliados mediante modelos finales probados y un panel interactivo.
role: Contratos de métricas · modelos dbt · panel
year: 2026
dataKind: synthetic
dataLabel: Datos sintéticos versionados
question: ¿Finanzas y Producto pueden confiar en MRR, NRR, churn y retención cuando los datos cambian y llegan tarde?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
socialImage: /social/subscription-analytics-dbt.png
imageAlt: Panel de suscripciones con MRR final, NRR, ingresos pagados y puente mensual de movimientos.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Validación del build
    value: 76 nodos aprobados
  - label: Control de métrica
    value: Puente de MRR reconciliado
  - label: Historia
    value: Snapshot SCD Type 2
scope:
  - Datos sintéticos versionados ejecutados localmente en DuckDB.
---

## Qué es este proyecto

Analítica de Suscripciones con dbt es un producto autocontenido para analizar ingresos recurrentes. Convierte datos versionados de suscripciones, facturas, clientes y eventos en modelos finales probados de MRR, NRR, cancelación, ingresos pagados y retención de cohortes. Estos modelos alimentan tanto la documentación de dbt como un panel interactivo.

Finanzas y Producto necesitan la misma respuesta a preguntas aparentemente simples: cuánto ingreso recurrente terminó el mes, qué cambió el saldo y cuántos clientes siguieron activos. Si MRR, NRR y retención de cohorte usan poblaciones inconsistentes, cada decisión posterior se convierte en una discusión de definiciones.

Construí el proyecto como un producto analítico compacto y no como una colección de consultas SQL. Convierte datos versionados de suscripciones, facturas, clientes y eventos en modelos reconciliados, métricas documentadas, pruebas y un panel que lee únicamente esas capas confiables.

## Por qué fallan las métricas de suscripción

Las métricas de suscripción mezclan saldos, movimientos y poblaciones. El MRR final es un saldo y no debe sumarse entre meses. Las altas, expansiones, contracciones, cancelaciones y reactivaciones son movimientos y deben conciliar el saldo inicial con el final. El NRR puede superar el 100 % si la expansión compensa las pérdidas, aunque disminuya la retención de clientes.

Los eventos tardíos crean otro riesgo. Reprocesar todo es costoso, pero aceptar solo timestamps posteriores al máximo previo pierde eventos demorados. Los atributos de clientes también cambian y conservar solo el registro actual reescribe el pasado.

## Qué construí

Definí contratos de métricas; organicé las capas de fuentes, preparación, transformación intermedia y modelos finales; implementé movimientos e historiales; y agregué pruebas para reglas de negocio. También construí un panel en Streamlit que consume los modelos finales en lugar de duplicar reglas en la visualización.

El repositorio se ejecuta con dbt y DuckDB sin credenciales de servicios en la nube. Los datos sintéticos versionados permiten investigar errores en la integración continua y repetir una compilación limpia.

## Requisitos de diseño

El resultado debe ser el mismo localmente y en GitHub Actions. Aunque pequeños y sintéticos, los datos deben demostrar preparación con tipos definidos, claves estables, nivel de detalle explícito, revisión incremental de eventos recientes, dimensiones con historial y conciliación.

El panel demuestra el consumo de los datos, pero no sustituye la documentación de dbt. DuckDB demuestra el comportamiento de los modelos, no los costos, la concurrencia ni el rendimiento de un almacén de datos real.

## Cómo funciona el producto de datos

La capa de preparación renombra y tipa campos sin alterar su significado. La capa intermedia construye periodos, actividad y movimientos mensuales. Los modelos finales exponen suscripciones, eventos, el puente de MRR, cohortes, cancelación y retención de ingresos.

El modelo de eventos es incremental y vuelve a revisar una ventana reciente para captar llegadas tardías. Un historial conserva los cambios de clientes como una dimensión de tipo 2. Las pruebas cubren unicidad, valores nulos, valores aceptados, relaciones y reglas como la conciliación de movimientos.

La aplicación lee los modelos finales de DuckDB y diferencia saldo, movimiento y tasa. No existe una segunda implementación de MRR en Python.

## Decisiones de métricas

Modelé los movimientos explícitamente en lugar de inferirlos en el gráfico, de modo que cada combinación de cliente y mes tenga una clasificación auditable. Fijé el denominador de cada cohorte en el momento de entrada; no disminuye cuando salen clientes. Para los eventos tardíos elegí volver a revisar una ventana limitada: recalcular todo es simple pero costoso, mientras que un corte estricto es eficiente pero pierde información.

## Resultados y validación

La compilación limpia termina con 76 nodos de dbt aprobados, incluidos modelos, datos iniciales, historiales y pruebas. El puente concilia los movimientos con la variación del saldo. El historial conserva los cambios y la documentación muestra dependencias, columnas y pruebas.

El panel muestra MRR final, NRR, ingresos, retención y movimientos. Los valores proceden de datos sintéticos identificados y demuestran que los modelos finales pueden alimentar una interfaz sin trasladar la lógica de negocio.

## El error del denominador

Una versión anterior contaba solo los clientes visibles en cada mes. El denominador caía junto con el numerador y hacía que la retención tardía pareciera mejor. La consulta era válida y el gráfico plausible, por lo que el riesgo era mayor.

Corregí el modelo materializando el tamaño original de la cohorte y conectando cada periodo a ese denominador fijo. Una prueba semántica protege el comportamiento. El episodio muestra por qué un panel bien presentado puede estar equivocado cuando la población no está definida de forma explícita.

## Cómo interpretar las métricas

Los datos son sintéticos y cubren pocos meses. El cambio de divisas usa valores definidos para la demostración; los impuestos, reembolsos, créditos y cambios contractuales están simplificados. El motor local no prueba permisos, costos ni orquestación. Un NRR superior al 100 % no representa crecimiento real.

## Frontera de producción

La adopción en producción exige conectar los contratos al modelo de eventos de facturación, acordar fechas de corte con Finanzas, agregar controles de actualización y umbrales de anomalía, y validar las reconstrucciones históricas contra cierres aprobados. Las estrategias incrementales del almacén de datos y el control de acceso vienen después de esa conciliación.

## Explora el proyecto

El repositorio incluye SQL, pruebas, datos sintéticos, documentación e integración continua. La demostración es una capa de presentación sobre modelos finales probados.
