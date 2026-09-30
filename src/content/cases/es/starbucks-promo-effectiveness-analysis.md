---
locale: es
slug: starbucks-promo-effectiveness-analysis
order: 4
title: Starbucks Promo Effectiveness
eyebrow: Decision Analytics
description: Un análisis observacional de promociones que atribuye ofertas repetidas a nivel de exposición, cuantifica señales económicas y define el experimento necesario para una decisión causal.
role: Analista de decisiones y builder
year: 2026
dataKind: public
dataLabel: Dataset simulado de comportamiento Starbucks
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
limitations:
  - Comportamiento observacional sin holdout aleatorio; los ingresos reportados no son lift incremental.
---

## La decisión

La pregunta útil no era solo qué oferta tenía la mayor tasa de finalización. Era qué promoción debía avanzar a una prueba controlada, con qué límites económicos y cuánta confianza permite el historial de eventos.

La recomendación es priorizar descuentos en la próxima prueba, mantener BOGO como challenger con guardrails económicos más estrictos y no tratar los mensajes informativos como promociones generadoras de conversión. Es una decisión de priorización de prueba, no de rollout.

## El problema de atribución

Un cliente puede recibir la misma oferta varias veces. Vistas, transacciones y finalizaciones pueden superponerse entre ventanas activas. Un join a nivel de cliente multiplicaría resultados y haría que una oferta frecuente pareciera mejor solo por enviarse más veces.

Modelé una fila por oferta recibida, creé un identificador único de exposición y asigné cada evento posterior a la exposición elegible más reciente dentro de su vigencia. Cada evento solo puede atribuirse una vez. Si falta la duración, el pipeline falla en lugar de crear silenciosamente una ventana ilimitada.

## Evidencia

Después de los controles demográficos, el análisis cubre 14.825 clientes, 115.609 exposiciones y 10 ofertas. Ver la oferta se asoció con una finalización que pasó de 35,4% a 62,2%, pero la vista ocurre después de la exposición y no puede definir un tratamiento aleatorio.

Los descuentos mostraron la asociación observada más fuerte: +84,6% entre los grupos comparados. Bajo el proxy documentado de costo de recompensa, produjeron cerca de US$87.670 de resultado observado y una razón recompensa/ingreso de +89%. BOGO tuvo +33,9%, pero cerca de -US$138.480 bajo el mismo proxy y una razón de -59%.

Estas cifras describen comportamiento observado y economía de escenario. No estiman valor causal incremental.

## Diseño de la decisión

El decision memo convierte el análisis en un plan de prueba. Los clientes elegibles deben asignarse aleatoriamente antes de la exposición, con intención de tratar como análisis principal. La métrica primaria es margen de contribución incremental por cliente elegible; finalización, conversión, ticket y aceptación son secundarias.

Costo de recompensa, frecuencia de contacto, bajas y concentración adversa por segmento actúan como guardrails. Escalar exige que el límite inferior del intervalo de confianza del margen incremental permanezca positivo sin violarlos.

## Lo que descarté

Descarté una historia causal simple entre quienes vieron y no vieron. La vista ocurre después de la asignación y sufre selección. También descarté ingresos atribuidos como ROI: pueden priorizar un experimento, pero no miden lift sin un contrafactual válido.

Un módulo sintético separado demuestra asignación balanceada, estimación de efecto y planificación de potencia. Los resultados causales simulados nunca se mezclan con las observaciones Starbucks.

## Calidad de ingeniería

El pipeline es reproducible desde los eventos hasta exposiciones, figuras y decision memo. Veintidós pruebas cubren invariantes de atribución, cálculos económicos y helpers causales. Afirmaciones, supuestos y limitaciones permanecen junto a los outputs que califican.

## Limitaciones y próxima prueba

No existe holdout aleatorio, el costo de recompensa no es un modelo completo de margen y las diferencias por segmento pueden reflejar composición. El siguiente paso es el experimento pre-registrado de descuento—no un rollout—con balance, intervalos de confianza y monitoreo de guardrails.
