---
locale: es
slug: marketplace-event-lakehouse
order: 3
title: Marketplace Event Lakehouse
eyebrow: Data Engineering
description: Un lakehouse replay-safe que convierte eventos duplicados, tardíos y desordenados en embudo e ingresos reconciliados.
role: Data engineer y analytics modeler
year: 2026
dataKind: generated
dataLabel: Eventos determinísticos generados
question: ¿Cómo convertir eventos duplicados, tardíos y fuera de orden en métricas confiables de embudo, GMV e ingresos?
repoUrl: https://github.com/J0BS013/marketplace-event-lakehouse
sourceCommit: 7b5a7e037408911d5ee15fdc49b015041a21f50c
evidence:
  - label: Confiabilidad
    value: MERGE replay-safe
  - label: Calidad
    value: Cuarentena + reconciliación
  - label: Performance
    value: Benchmark versionado de 100 mil
limitations:
  - Carga local determinística; no prueba throughput a escala cloud.
---

## La decisión

Un marketplace necesita saber dónde se abandona la jornada, cuánto GMV se creó y qué ingreso puede reconocerse. Esas decisiones solo son defendibles si el pipeline maneja duplicados, demoras y secuencias imposibles sin cambiar silenciosamente resultados anteriores.

Construí el lakehouse para hacer visible la confiabilidad. El objetivo no es mostrar carpetas Bronze, Silver y Gold, sino probar que reprocesar el mismo input no duplica hechos, que los rechazos pueden explicarse y que el embudo respeta una jornada posible.

## Contexto

Los eventos tienen dos relojes. Event time indica cuándo actuó el usuario; ingestion time, cuándo la plataforma recibió el registro. Un checkout demorado puede llegar en otro lote y un retry puede duplicar el evento. Los atributos de seller y producto también cambian y deben reconstruirse históricamente.

Los conteos ingenuos convierten problemas técnicos en comportamiento aparente. Los duplicados inflan GMV, las dimensiones actuales reescriben historia y los conteos independientes pueden producir más checkouts que carts.

## Mi rol

Diseñé el generador determinístico, las transformaciones PySpark, tablas Delta, orquestación Prefect y modelos Gold. Especifiqué reglas de calidad, cuarentena, metadatos de ejecución, alertas de SLA y un benchmark versionado. También escribí las pruebas y el runbook de recuperación.

La pregunta central era cómo hacer seguro el retry, porque reintentar es comportamiento operativo normal y no una excepción rara.

## Restricciones

El repositorio corre en Docker local y equilibra arquitectura realista con ejecución accesible. Los eventos son generados y el benchmark describe el entorno documentado, no un cluster Spark administrado.

El pipeline debe preservar evidencia bruta, aislar inválidos, permitir backfill y evitar efectos secundarios en reruns. Gold debe reconciliar con eventos aceptados en Silver, no con el Bronze ruidoso.

## Enfoque

Bronze almacena eventos inmutables con payload, event time, ingestion time y metadatos. Silver valida schemas, normaliza, deduplica IDs, aplica watermark y envía filas inválidas o demasiado tardías a cuarentena. `MERGE` en Delta hace idempotente la escritura.

Las dimensiones usan SCD Type 2 para resolver la versión válida al event time. Sessionization organiza jornadas. Gold produce pedidos, ingresos diarios y un embudo acumulativo en el que cada etapa requiere la anterior dentro de una secuencia válida.

Prefect coordina etapas y registra lecturas, escrituras, duplicados, tardíos, rechazos, freshness y alertas. El runbook cubre retry, backfill y fallas comunes.

## Decisiones de diseño

Conservé ambos relojes: event time representa verdad de comportamiento; ingestion time permite diagnóstico. El watermark es una política con cuarentena explícita, no un filtro silencioso.

Elegí Bronze inmutable y merges idempotentes. Sobrescribir raw simplificaría el corto plazo, pero eliminaría evidencia. Para el embudo descarté conteos diarios independientes y evalué milestones ordenados dentro de cada sesión.

## Evidencia

El smoke run reporta filas leídas y escritas por capa, duplicados, tardíos, rechazos, versiones de dimensiones y tamaños Gold. Los modelos de ingresos reconcilian pedidos pagados. Repetir el input preserva cardinalidad por las claves estables.

El repositorio incluye un benchmark de 100 mil eventos con entorno y tiempos. Sirve para detectar regresiones, no para afirmar escala cloud. Las pruebas cubren idempotencia, cuarentena, intervalos SCD2, secuencia y reconciliación.

## Cuando checkout superó a cart

Una primera versión agrupaba eventos por día y contaba cada tipo de manera independiente. Como podían llegar tarde o pertenecer a sesiones distintas, aparecían más checkouts que carts. La agregación cumplía el SQL, pero la métrica no representaba una jornada.

Reemplacé esos conteos por milestones acumulativos y sensibles a secuencia. Una sesión debe contener el requisito antes de la etapa siguiente. Una prueba de regresión protege la regla. La corrección cambió tanto la lógica como la definición comunicada.

## Limitaciones

El generador no reproduce todas las fallas de producción. El benchmark local no prueba autoscaling, throughput cloud o concurrencia. Identity stitching es simplificado y la ventana de sesión es una regla elegida. No hay streaming, schema registry empresarial ni plataforma completa de observabilidad.

## Próximo paso

En un entorno real validaría el contrato con productores, publicaría compatibilidad y reproduciría una partición histórica junto al warehouse actual. También definiría budgets de costo y latencia, monitorearía la cuarentena y asignaría ownership a cada SLA antes de pasar a procesamiento continuo.

## Enlaces

El repositorio contiene Docker, carga generada, orquestación, pruebas, benchmark y runbook. El diagrama corresponde a las capas implementadas en el commit indicado.
