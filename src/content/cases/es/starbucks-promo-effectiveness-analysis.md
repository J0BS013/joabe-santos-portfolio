---
locale: es
slug: starbucks-promo-effectiveness-analysis
order: 4
title: Efectividad de las Promociones de Starbucks
eyebrow: Decision Analytics
description: Un análisis observacional de promociones que atribuye ofertas repetidas a nivel de exposición, cuantifica señales económicas y define el experimento necesario para una decisión causal.
role: Atribución · economía · diseño experimental
year: 2026
dataKind: public
dataLabel: Datos simulados de comportamiento de Starbucks
question: ¿Qué oferta merece la próxima prueba controlada y qué puede demostrar realmente el comportamiento histórico?
repoUrl: https://github.com/J0BS013/starbucks-promo-effectiveness-analysis
image: /images/projects/starbucks-promo-effectiveness-analysis.png
socialImage: /social/starbucks-promo-effectiveness-analysis.png
imageAlt: Comparación de ingresos observados y costo de recompensa para ofertas de descuento, BOGO e informativas.
sourceCommit: 652ff04cc5c8787233b9addbe5ee433e127f03ae
evidence:
  - label: Clientes válidos
    value: "14.825"
  - label: Exposiciones a ofertas
    value: "115.609"
  - label: Asociación del descuento
    value: "+84,6%"
  - label: Pruebas automatizadas
    value: "22"
scope:
  - Comportamiento observado utilizado para priorizar un experimento controlado.
---

## Qué es este proyecto

Efectividad de las Promociones de Starbucks es un análisis integral de exposiciones promocionales repetidas. Reconstruye a qué oferta pertenece cada vista, transacción y finalización, compara campañas de descuento, BOGO e informativas y convierte los hallazgos observacionales en una recomendación de prueba controlada.

La pregunta útil no es solo qué oferta tiene la mayor tasa de finalización. Es qué promoción debe avanzar a una prueba controlada, con qué límites económicos y cuánta confianza permite el historial de eventos.

La recomendación es priorizar los descuentos en la próxima prueba, mantener BOGO como alternativa con límites económicos más estrictos y no tratar los mensajes informativos como promociones que generan conversión. Es una decisión sobre qué probar primero, no una recomendación para lanzar la campaña a toda la base.

## El problema de atribución

Un cliente puede recibir la misma oferta varias veces. Las vistas, transacciones y finalizaciones pueden superponerse entre ventanas activas. Una unión de datos a nivel de cliente multiplicaría resultados y haría que una oferta frecuente pareciera mejor solo por enviarse más veces.

Modelé una fila por oferta recibida, creé un identificador único de exposición y asigné cada evento posterior a la exposición elegible más reciente dentro de su vigencia. Cada evento solo puede atribuirse una vez. Si falta la duración, el pipeline falla en lugar de crear silenciosamente una ventana ilimitada.

## Hallazgos

Después de los controles demográficos, el análisis cubre 14.825 clientes, 115.609 exposiciones y 10 ofertas. Ver la oferta se asoció con una finalización que pasó de 35,4% a 62,2%, pero la vista ocurre después de la exposición y no puede definir un tratamiento aleatorio.

Los descuentos mostraron la asociación observada más fuerte: +84,6% entre los grupos comparados. Bajo el proxy documentado de costo de recompensa, produjeron cerca de US$87.670 de resultado observado y una razón recompensa/ingreso de +89%. BOGO tuvo +33,9%, pero cerca de -US$138.480 bajo el mismo proxy y una razón de -59%.

Estas cifras describen comportamiento observado y economía de escenario. No estiman valor causal incremental.

## Diseño del experimento

El memorando de decisión convierte el análisis en un plan de prueba. Los clientes elegibles deben asignarse aleatoriamente antes de la exposición, con intención de tratar como análisis principal. La métrica principal es el margen de contribución incremental por cliente elegible; la finalización, la conversión, el valor del pedido y la aceptación son métricas secundarias.

El costo de la recompensa, la frecuencia de contacto, las bajas y la concentración adversa por segmento actúan como límites de seguridad. Escalar exige que el límite inferior del intervalo de confianza del margen incremental permanezca positivo sin vulnerarlos.

## Lo que descarté

Descarté una historia causal simple entre quienes vieron y no vieron. La vista ocurre después de la asignación y sufre selección. También descarté ingresos atribuidos como ROI: pueden priorizar un experimento, pero no miden lift sin un contrafactual válido.

Un módulo sintético separado demuestra asignación balanceada, estimación de efecto y planificación de potencia. Los resultados causales simulados nunca se mezclan con las observaciones Starbucks.

## Validación y reproducibilidad

El proceso es reproducible desde los eventos hasta las exposiciones, las figuras y el memorando de decisión. Veintidós pruebas cubren reglas de atribución, cálculos económicos y funciones de apoyo al análisis causal. Las afirmaciones, los supuestos y el alcance de la evidencia permanecen junto a los resultados que los sustentan.

## Qué significa la recomendación

El análisis sustenta priorizar un experimento de descuentos definido de antemano, no declarar un ganador para desplegarlo a toda la base. Una decisión válida utiliza un grupo de control aleatorio, una definición completa del margen de contribución, controles de equilibrio, intervalos de confianza y monitoreo de límites de seguridad con el tamaño de muestra planificado.
