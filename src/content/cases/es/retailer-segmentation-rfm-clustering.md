---
locale: es
slug: retailer-segmentation-rfm-clustering
order: 5
title: Retailer RFM Decisioning
eyebrow: Customer Analytics
description: Un pipeline reproducible de segmentación que convierte comportamiento RFM en acciones de campaña sensibles al costo, validadas con clustering y expuestas mediante outputs analíticos confiables.
role: Analytics engineer y analista de decisiones
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
limitations:
  - La economía de campaña usa supuestos explícitos de escenario, no respuesta incremental medida.
---

## La decisión

La segmentación solo importa cuando cambia una acción. El proyecto pregunta qué clientes deben recibir inversión de retención, lealtad o reactivación—y cuáles no deben recibir contacto pagado porque el valor esperado no justifica el costo.

El output combina una política RFM interpretable con una capa de decisión de campaña. Cada cliente recibe un segmento, una acción recomendada o `do_not_target` y un valor neto esperado bajo supuestos visibles.

## De transacciones a comportamiento

El dataset público Online Retail II contiene 1.041.670 transacciones entre diciembre de 2009 y diciembre de 2011. El pipeline limpia la semántica transaccional, resuelve clientes identificados y produce Recency, Frequency y Monetary para 5.878 clientes.

Los quintiles RFM crean segmentos deterministas y explicables. K-means sobre features transformadas funciona como validación, no como sustituto opaco. Cinco clusters produjeron un pico local de silhouette de 0,61 y apoyaron la estructura de comportamiento.

## Evidencia

Champions son solo 22,0% de los clientes, pero concentran 68,2% de los ingresos. Promedian £9.361,66 de gasto, 17,1 pedidos y apenas 18,7 días desde su última compra. Loyal Customers representan 24,0% de los clientes y 15,5% de los ingresos.

At Risk es diferente: 14,0% de los clientes, 9,2% de los ingresos y £1.983,10 de gasto medio, pero 368,1 días desde la última compra. Lost es el grupo más grande con 32,5%, aunque aporta solo 4,9% de los ingresos y promedia 1,3 pedidos.

Esa concentración hace ineficientes las campañas indiscriminadas. La inactividad de alto valor necesita una intervención diferente al comportamiento ocasional de bajo valor.

## Capa de decisión

La política combina respuesta base, conversión incremental, margen, costo de contacto e incentivo. Son supuestos explícitos de escenario, no conclusiones inferidas del dataset. El cliente se contacta solo si la acción tiene valor neto esperado positivo; de lo contrario, el output es `do_not_target`.

Así, el trade-off económico es revisable. Los supuestos pueden cambiar y las decisiones afectadas quedan visibles sin ocultar la lógica dentro de una etiqueta de cluster.

## Lo que descarté

Descarté usar etiquetas de k-means como respuesta final. Los números de cluster no tienen significado estable ni explican una intervención. La política RFM determinista sigue siendo operacional por ser auditable; clustering verifica si la estructura es plausible.

También descarté contactar a todo cliente Lost. Su volumen parece atractivo, pero la baja frecuencia y pequeña participación en ingresos dificultan justificar un win-back amplio. Solo la porción de mayor valor debe pasar la regla económica positiva.

## Calidad de ingeniería

Pandera valida contratos, Parquet conserva outputs tipados y DuckDB permite inspección analítica. Pruebas, Docker y CI hacen reproducible el pipeline. Un artefacto versionado de métricas conecta las afirmaciones del README y del portafolio con los resultados generados.

## Limitaciones y próxima prueba

RFM describe el pasado; no estima respuesta incremental ni lifetime value. Los supuestos deben calibrarse con un holdout aleatorio. El siguiente paso es un experimento estratificado por segmento que mida margen incremental, con presión de contacto y opt-out como guardrails.
