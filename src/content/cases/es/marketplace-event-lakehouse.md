---
locale: es
slug: marketplace-event-lakehouse
order: 3
title: Lakehouse de Eventos del Marketplace
eyebrow: Data Engineering
description: Un lakehouse que puede reprocesar datos sin duplicarlos y convierte eventos tardíos, repetidos o fuera de orden en métricas conciliadas de embudo e ingresos.
role: Pipeline de eventos · calidad · modelos Gold
year: 2026
dataKind: generated
dataLabel: Eventos determinísticos generados
question: ¿Cómo convertir eventos duplicados, tardíos y fuera de orden en métricas confiables de embudo, GMV e ingresos?
repoUrl: https://github.com/J0BS013/marketplace-event-lakehouse
socialImage: /social/marketplace-event-lakehouse.png
sourceCommit: 7b5a7e037408911d5ee15fdc49b015041a21f50c
evidence:
  - label: Confiabilidad
    value: Reprocesamiento seguro con MERGE
  - label: Calidad
    value: Cuarentena + reconciliación
  - label: Rendimiento
    value: Prueba versionada con 100 mil eventos
scope:
  - Carga local determinista con una prueba de rendimiento versionada de 100 mil eventos.
---

## Qué es este proyecto

El Lakehouse de Eventos del Marketplace es un proceso en Docker con PySpark, Delta Lake y Prefect para eventos de comportamiento. Ingiere lotes con problemas, conserva la evidencia original, pone registros inválidos en cuarentena y produce modelos de pedidos, ingresos y embudo que pueden reprocesarse sin duplicar resultados.

Un marketplace necesita saber dónde se abandona la jornada, cuánto GMV se creó y qué ingreso puede reconocerse. Esas decisiones solo son defendibles si el pipeline maneja duplicados, demoras y secuencias imposibles sin cambiar silenciosamente resultados anteriores.

Construí el lakehouse para hacer visible la confiabilidad. El objetivo no es mostrar carpetas Bronze, Silver y Gold, sino probar que reprocesar la misma entrada no duplica hechos, que los rechazos pueden explicarse y que el embudo respeta un recorrido posible.

## Por qué los eventos son difíciles

Los eventos tienen dos relojes. La hora del evento indica cuándo actuó el usuario; la hora de ingesta, cuándo la plataforma recibió el registro. Un pago demorado puede llegar en otro lote y un reintento puede duplicar el evento. Los atributos del vendedor y del producto también cambian y deben reconstruirse históricamente.

Los conteos ingenuos convierten problemas técnicos en comportamiento aparente. Los duplicados inflan el GMV, las dimensiones actuales reescriben la historia y los conteos independientes pueden producir más pagos que carritos.

## Qué construí

Diseñé el generador determinista, las transformaciones en PySpark, las tablas Delta, la orquestación con Prefect y los modelos Gold. Especifiqué reglas de calidad, cuarentena, metadatos de ejecución, alertas de nivel de servicio y una prueba de rendimiento versionada. También escribí las pruebas y la guía de recuperación.

La pregunta central era cómo hacer seguros los reintentos, porque volver a ejecutar una carga es una operación normal y no una excepción rara.

## Requisitos de diseño

El repositorio se ejecuta en Docker local y equilibra una arquitectura realista con una ejecución accesible. Los eventos son generados y la prueba de rendimiento describe el entorno documentado, no un clúster administrado de Spark.

El proceso debe preservar la evidencia original, aislar registros inválidos, permitir reconstrucciones históricas y evitar efectos secundarios al volver a ejecutarse. Gold debe conciliarse con los eventos aceptados en Silver, no con la entrada sin depurar de Bronze.

## Cómo funciona el lakehouse

Bronze almacena eventos inmutables con su contenido, hora del evento, hora de ingesta y metadatos. Silver valida esquemas, normaliza campos, elimina identificadores repetidos, aplica una tolerancia de demora y envía filas inválidas o demasiado tardías a cuarentena. `MERGE` en Delta permite repetir una escritura sin duplicar resultados.

Las dimensiones usan historial de tipo 2 para encontrar la versión válida en la hora del evento. La división en sesiones organiza los recorridos. Gold produce pedidos, ingresos diarios y un embudo acumulativo en el que cada etapa requiere la anterior dentro de una secuencia válida.

Prefect coordina las etapas y registra lecturas, escrituras, duplicados, demoras, rechazos, actualización de datos y alertas. La guía operativa cubre reintentos, reconstrucciones históricas y fallas comunes.

## Decisiones clave

Conservé ambos relojes: la hora del evento representa el comportamiento; la hora de ingesta permite diagnosticar la operación. La tolerancia de demora es una política con cuarentena explícita, no un filtro silencioso.

Elegí una capa Bronze inmutable y uniones que pueden repetirse sin cambiar el resultado. Sobrescribir los datos originales simplificaría el corto plazo, pero eliminaría evidencia. Para el embudo descarté conteos diarios independientes y evalué etapas ordenadas dentro de cada sesión.

## Resultados y validación

La ejecución de verificación informa filas leídas y escritas por capa, duplicados, demoras, rechazos, versiones de dimensiones y tamaños de los modelos Gold. Los modelos de ingresos concilian los pedidos pagados. Repetir la misma entrada conserva el número de registros gracias a claves estables.

El repositorio incluye una prueba de rendimiento con 100 mil eventos, el entorno usado y los tiempos obtenidos. Sirve para detectar regresiones, no para afirmar escalabilidad en la nube. Las pruebas cubren reprocesamiento seguro, cuarentena, intervalos históricos, secuencia y conciliación.

## Cuando los pagos superaron a los carritos

Una primera versión agrupaba eventos por día y contaba cada tipo de manera independiente. Como podían llegar tarde o pertenecer a sesiones distintas, aparecían más pagos que carritos. La agregación cumplía el SQL, pero la métrica no representaba un recorrido.

Reemplacé esos conteos por etapas acumulativas que respetan la secuencia. Una sesión debe contener el requisito antes de la etapa siguiente. Una prueba de regresión protege la regla. La corrección cambió tanto la lógica como la definición comunicada.

## Cómo interpretar la prueba de rendimiento

El generador no reproduce todas las fallas de producción. La prueba local no demuestra escalado automático, capacidad de procesamiento en la nube ni concurrencia. La unión de identidades está simplificada y la ventana de sesión es una regla elegida. No hay procesamiento continuo, registro empresarial de esquemas ni una plataforma completa de observabilidad.

## Frontera de producción

Una implementación en producción exige validar contratos con los productores de eventos, publicar reglas de compatibilidad y reproducir una partición histórica representativa junto al almacén de datos actual. Los límites de costo y latencia, el monitoreo de cuarentena y la responsabilidad sobre cada nivel de servicio forman parte de ese modelo operativo antes del procesamiento continuo.

## Explora el proyecto

El repositorio contiene Docker, datos generados, orquestación, pruebas, medición de rendimiento y una guía operativa. El diagrama corresponde a las capas implementadas en la versión indicada.
