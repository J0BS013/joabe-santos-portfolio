---
locale: pt-br
slug: retailer-segmentation-rfm-clustering
order: 5
title: Retailer RFM Decisioning
eyebrow: Customer Analytics
description: Um pipeline reproduzível de segmentação que transforma comportamento RFM em ações de campanha sensíveis a custo, validadas por clustering e expostas em outputs analíticos confiáveis.
role: Analytics engineer e analista de decisão
year: 2026
dataKind: public
dataLabel: UCI Online Retail II
question: Quais clientes merecem investimento de retenção e quando não impactar é a melhor decisão?
repoUrl: https://github.com/J0BS013/retailer-segmentation-rfm-clustering
image: /images/projects/retailer-segmentation-rfm-clustering.png
socialImage: /social/retailer-segmentation-rfm-clustering.png
imageAlt: Participação de clientes e receita entre os segmentos Champions, Loyal, At Risk, Lost e New.
sourceCommit: 4374d4e31555ebf3734a301da98da333de9ced81
evidence:
  - label: Clientes
    value: "5.878"
  - label: Transações
    value: "1,04 mi"
  - label: Receita em Champions
    value: "68,2%"
  - label: Silhouette do k-means
    value: "0,61"
limitations:
  - A economia de campanha usa premissas explícitas de cenário, não resposta incremental medida.
---

## A decisão

Segmentação só importa quando muda uma ação. O projeto pergunta quais clientes devem receber investimento de retenção, fidelidade ou reativação—e quais não devem receber contato pago porque o valor esperado não justifica o custo.

O output combina uma política RFM interpretável com uma camada de decisão de campanha. Cada cliente recebe um segmento, uma ação recomendada ou `do_not_target` e um valor líquido esperado sob premissas visíveis.

## Das transações ao comportamento

O dataset público Online Retail II contém 1.041.670 transações entre dezembro de 2009 e dezembro de 2011. O pipeline limpa a semântica transacional, resolve clientes identificados e produz Recency, Frequency e Monetary para 5.878 clientes.

Quintis RFM criam segmentos determinísticos e explicáveis. K-means sobre features transformadas funciona como lente de validação, não substituto opaco. Cinco clusters geraram um pico local de silhouette de 0,61 e sustentaram a estrutura comportamental.

## Evidências

Champions são apenas 22,0% dos clientes, mas respondem por 68,2% da receita. Têm gasto médio de £9.361,66, 17,1 pedidos e somente 18,7 dias desde a última compra. Loyal Customers representam 24,0% dos clientes e 15,5% da receita.

At Risk é estrategicamente diferente: 14,0% dos clientes, 9,2% da receita e £1.983,10 de gasto médio, mas 368,1 dias desde a última compra. Lost é o maior grupo, com 32,5%, porém responde por apenas 4,9% da receita e 1,3 pedido em média.

Essa concentração torna campanhas indiscriminadas ineficientes. Inatividade de alto valor exige uma intervenção diferente de comportamento pontual de baixo valor.

## Camada de decisão

A política combina resposta base, conversão incremental, margem, custo de contato e incentivo. São premissas de cenário armazenadas explicitamente, não conclusões inferidas do dataset. O cliente só é impactado quando a ação tem valor líquido esperado positivo; caso contrário, o output é `do_not_target`.

Assim, o trade-off econômico é revisável. Premissas podem mudar e as decisões afetadas ficam visíveis, sem esconder regra de negócio dentro de um rótulo de cluster.

## O que descartei

Descartei usar rótulos de k-means como resposta final. Números de cluster não têm significado estável nem explicam uma intervenção. A política RFM determinística permanece operacional por ser auditável; o clustering verifica se a estrutura escolhida é plausível.

Também descartei impactar todo cliente Lost. O volume parece atraente, mas baixa frequência e pequena participação na receita tornam um win-back amplo difícil de justificar. Apenas a parcela de maior valor deve passar pela regra econômica positiva.

## Qualidade de engenharia

Pandera valida contratos de dados, Parquet preserva outputs tipados e DuckDB permite inspeção analítica. Testes, Docker e CI tornam o pipeline reproduzível. Um artefato versionado de métricas conecta as afirmações do README e do portfólio aos resultados gerados.

## Limitações e próximo teste

RFM descreve o passado; não estima resposta incremental nem lifetime value. As premissas devem ser calibradas com holdout randomizado. O próximo passo é um experimento estratificado por segmento medindo margem incremental, com pressão de contato e opt-out como guardrails.
