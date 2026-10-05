---
locale: es
slug: retailer-segmentation-rfm-clustering
order: 5
title: Decisiones de Campaña con RFM
eyebrow: Análisis de Clientes
description: Un proceso reproducible de segmentación que convierte el comportamiento RFM en acciones de campaña sensibles al costo, validadas con agrupamiento y publicadas como resultados analíticos confiables.
role: Segmentación · política de campaña · proceso analítico
year: 2026
dataKind: public
dataLabel: UCI Online Retail II
question: ¿Qué clientes merecen inversión de retención y cuándo no contactar es la mejor decisión?
repoUrl: https://github.com/J0BS013/retailer-segmentation-rfm-clustering
image: /images/projects/retailer-segmentation-rfm-clustering.png
socialImage: /social/retailer-segmentation-rfm-clustering.png
imageAlt: Participación de clientes e ingresos entre los segmentos Champions, Loyal, At Risk, Lost y New.
sourceCommit: 4374d4e31555ebf3734a301da98da333de9ced81
evidence:
  - label: Clientes
    value: "5.878"
  - label: Transacciones
    value: "1,04 M"
  - label: Ingresos en Champions
    value: "68,2%"
  - label: Silhouette de k-means
    value: "0,61"
scope:
  - Transacciones públicas combinadas con escenarios económicos explícitos de campaña.
---

## Qué es este proyecto

Decisiones de Campaña con RFM es un proceso reproducible de análisis de clientes construido sobre 1,04 millones de transacciones públicas. Crea segmentos RFM interpretables, compara su estructura con k-means y asigna una acción de campaña —o la decisión de no contactar— mediante supuestos explícitos de respuesta, margen y costo de contacto.

La segmentación solo importa cuando cambia una acción. La pregunta práctica es qué clientes deben recibir inversión de retención, lealtad o reactivación y cuáles no deben recibir contacto pagado porque el valor esperado no justifica el costo.

El resultado combina una política RFM interpretable con una capa de decisión de campaña. Cada cliente recibe un segmento, una acción recomendada o la decisión de no contactar, y un valor neto esperado bajo supuestos visibles.

## De transacciones a comportamiento

Los datos públicos de Online Retail II contienen 1.041.670 transacciones entre diciembre de 2009 y diciembre de 2011. El proceso depura la semántica transaccional, identifica clientes y calcula Recencia, Frecuencia y Valor Monetario para 5.878 clientes.

Los quintiles RFM crean segmentos deterministas y explicables. K-means sobre variables transformadas funciona como validación, no como sustituto opaco. Cinco grupos produjeron un máximo local del coeficiente silhouette de 0,61 y respaldaron la estructura de comportamiento.

## Hallazgos

Champions son solo 22,0% de los clientes, pero concentran 68,2% de los ingresos. Promedian £9.361,66 de gasto, 17,1 pedidos y apenas 18,7 días desde su última compra. Loyal Customers representan 24,0% de los clientes y 15,5% de los ingresos.

At Risk es diferente: 14,0% de los clientes, 9,2% de los ingresos y £1.983,10 de gasto medio, pero 368,1 días desde la última compra. Lost es el grupo más grande con 32,5%, aunque aporta solo 4,9% de los ingresos y promedia 1,3 pedidos.

Esa concentración hace ineficientes las campañas indiscriminadas. La inactividad de alto valor necesita una intervención diferente al comportamiento ocasional de bajo valor.

## Capa de decisión de campaña

La política combina respuesta base, conversión incremental, margen, costo de contacto e incentivo. Son supuestos explícitos del escenario, no conclusiones inferidas de los datos. El cliente se contacta solo si la acción tiene un valor neto esperado positivo; de lo contrario, la decisión es no contactar.

Así, el equilibrio entre costo y beneficio puede revisarse. Los supuestos pueden cambiar y las decisiones afectadas quedan visibles, sin ocultar la lógica dentro de una etiqueta de grupo.

## Lo que descarté

Descarté usar las etiquetas de k-means como respuesta final. Los números de los grupos no tienen un significado estable ni explican una intervención. La política RFM determinista sigue siendo operativa porque puede auditarse; el agrupamiento verifica si la estructura es plausible.

También descarté contactar a todo cliente Lost. Su volumen parece atractivo, pero la baja frecuencia y pequeña participación en ingresos dificultan justificar un win-back amplio. Solo la porción de mayor valor debe pasar la regla económica positiva.

## Validación y reproducibilidad

Pandera valida contratos, Parquet conserva resultados con tipos definidos y DuckDB permite la inspección analítica. Las pruebas, Docker y la integración continua hacen reproducible el proceso. Un archivo versionado de métricas conecta las afirmaciones del README y del portafolio con los resultados generados.

## Qué significa la recomendación

RFM describe el comportamiento pasado y la política evalúa escenarios transparentes; ninguno se presenta como respuesta incremental ni como valor de vida del cliente medido. El diseño recomendado para activación utiliza un grupo de control estratificado por segmento y mide el margen de contribución incremental, con frecuencia de contacto y bajas como límites de seguridad.
