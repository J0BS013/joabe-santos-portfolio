---
locale: es
slug: subscription-analytics-dbt
order: 2
title: Subscription Analytics with dbt
eyebrow: Analytics Engineering
description: Una capa probada para MRR, NRR, churn y cohortes, con contratos explícitos y tratamiento de datos tardíos.
role: Analytics engineer
year: 2026
dataKind: synthetic
dataLabel: Fixtures sintéticas versionadas
question: ¿Finanzas y Producto pueden confiar en MRR, NRR, churn y retención cuando los datos cambian y llegan tarde?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
imageAlt: Dashboard de suscripciones con MRR final, NRR, ingresos pagados y puente mensual de movimientos.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Validación del build
    value: 76 nodos aprobados
  - label: Control de métrica
    value: Puente de MRR reconciliado
  - label: Historia
    value: Snapshot SCD Type 2
limitations:
  - Fixtures sintéticas y DuckDB local; no es un sistema de facturación productivo.
---

## La decisión

Finanzas y Producto necesitan la misma respuesta a preguntas aparentemente simples: cuánto ingreso recurrente terminó el mes, qué cambió el saldo y cuántos clientes siguieron activos. Si MRR, net revenue retention y retención de cohorte usan poblaciones inconsistentes, cada decisión posterior se convierte en una discusión de definiciones.

Construí el proyecto como un producto analítico compacto y no como una colección de SQL. Convierte fixtures de suscripciones, facturas, clientes y eventos en marts reconciliados, métricas documentadas, pruebas y un dashboard que lee solamente esas capas confiables.

## Contexto

Las métricas de suscripción mezclan saldos, movimientos y poblaciones. El MRR final es un saldo y no debe sumarse entre meses. New, expansion, contraction, churn y reactivation son movimientos y deben reconciliar apertura con cierre. NRR puede superar 100% si la expansión compensa pérdidas, aunque la retención de clientes caiga.

Los eventos tardíos crean otro riesgo. Reprocesar todo es costoso, pero aceptar solo timestamps posteriores al máximo previo pierde eventos demorados. Los atributos de clientes también cambian y conservar solo el registro actual reescribe el pasado.

## Mi rol

Definí contratos de métricas, organicé source, staging, intermediate y marts, implementé movimientos y snapshots y agregué pruebas para invariantes de negocio. También construí un dashboard Streamlit que consume los marts en lugar de duplicar reglas en la visualización.

El repositorio se ejecuta con dbt y DuckDB sin credenciales de cloud. Las fixtures versionadas permiten revisar errores en CI y repetir un build limpio.

## Restricciones

El resultado debe ser igual localmente y en GitHub Actions. Aunque pequeños y sintéticos, los datos deben demostrar staging tipado, claves estables, granos explícitos, lookback incremental, slowly changing dimensions y reconciliación.

El dashboard prueba consumo, no sustituye la documentación de dbt. DuckDB demuestra comportamiento, no costos, concurrencia o performance de un warehouse real.

## Enfoque

Staging renombra y tipa campos preservando el significado original. Intermediate construye períodos, actividad y movimientos mensuales. Los marts exponen hechos de suscripción, eventos, el puente de MRR, cohortes, churn y revenue retention.

El modelo de eventos es incremental con lookback. Un snapshot mantiene historia de clientes como SCD Type 2. Las pruebas cubren unicidad, nulos, valores aceptados, relaciones y reglas como la reconciliación de movimientos.

La aplicación lee los marts de DuckDB y diferencia saldo, movimiento y tasa. No existe una segunda implementación de MRR en Python.

## Decisiones de diseño

Modelé movimientos explícitamente en lugar de inferirlos en el gráfico, de modo que cada customer-month tenga una clasificación auditable. Fijé el denominador de cada cohorte al ingreso; no disminuye cuando salen clientes. Para late-arriving events elegí un lookback acotado: full refresh es simple pero costoso; un corte estricto es eficiente pero incorrecto.

## Evidencia

El build limpio termina con 76 nodos dbt aprobados, incluyendo modelos, seeds, snapshots y tests. El puente reconcilia movimientos con la variación del saldo. El snapshot preserva historia y la documentación expone lineage, columnas y pruebas.

El dashboard muestra MRR final, NRR, ingresos, retención y movimientos. Los valores proceden de fixtures sintéticas identificadas y demuestran que los marts pueden servir una interfaz sin mover la lógica de negocio.

## El error del denominador

Una versión anterior contaba solo los clientes visibles en cada mes. El denominador caía junto con el numerador y hacía que la retención tardía pareciera mejor. La consulta era válida y el gráfico plausible, por lo que el riesgo era mayor.

Corregí el modelo materializando el tamaño original de la cohorte y conectando cada período a ese denominador fijo. Una prueba semántica protege el comportamiento. El episodio muestra por qué un dashboard pulido puede estar equivocado cuando el contrato poblacional es implícito.

## Limitaciones

Los datos son sintéticos y cubren pocos meses. El cambio usa fixtures; impuestos, refunds, créditos y cambios contractuales están simplificados. El motor local no prueba permisos, costos u orquestación. NRR superior a 100% no representa crecimiento real.

## Próximo paso

En producción mapearía los contratos al billing real, alinearía cutoffs con Finanzas, agregaría freshness y anomalías y validaría backfills contra cierres aprobados. La estrategia incremental del warehouse y el acceso vendrían después de reconciliar.

## Enlaces

El repositorio incluye SQL, pruebas, fixtures, documentación y CI. La demo es una capa de presentación sobre marts probados.
