---
locale: pt-br
slug: retailer-segmentation-rfm-clustering
order: 5
title: Decisões de Campanha com RFM
eyebrow: Análise de Clientes
description: Um pipeline reproduzível de segmentação que transforma o comportamento RFM em ações de campanha orientadas por custo, validadas com agrupamento e publicadas em resultados analíticos confiáveis.
role: Segmentação · política de campanha · pipeline
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
scope:
  - Transações públicas combinadas com cenários econômicos explícitos de campanha.
---

## O que é este projeto

Decisões de Campanha com RFM é um pipeline reproduzível de análise de clientes construído sobre 1,04 milhão de transações públicas. Ele cria segmentos RFM interpretáveis, compara sua estrutura com k-means e atribui uma ação de campanha — ou `não abordar` — usando premissas explícitas de resposta, margem e custo de contato.

Segmentação só importa quando muda uma ação. A pergunta prática é quais clientes devem receber investimento de retenção, fidelidade ou reativação, e quais não devem receber contato pago porque o valor esperado não justifica o custo.

O resultado combina uma política RFM interpretável com uma camada de decisão de campanha. Cada cliente recebe um segmento, uma ação recomendada ou a indicação `não abordar`, além do valor líquido esperado sob premissas visíveis.

## Das transações ao comportamento

O conjunto público Online Retail II contém 1.041.670 transações entre dezembro de 2009 e dezembro de 2011. O pipeline trata a semântica das transações, identifica os clientes e calcula recência, frequência e valor monetário para 5.878 clientes.

Quintis RFM criam segmentos determinísticos e explicáveis. O k-means aplicado às variáveis transformadas funciona como validação, não como substituto opaco. Cinco grupos produziram um pico local de silhouette de 0,61 e sustentaram a estrutura comportamental.

## Principais achados

Champions são apenas 22,0% dos clientes, mas respondem por 68,2% da receita. Têm gasto médio de £9.361,66, 17,1 pedidos e somente 18,7 dias desde a última compra. Loyal Customers representam 24,0% dos clientes e 15,5% da receita.

At Risk é estrategicamente diferente: 14,0% dos clientes, 9,2% da receita e £1.983,10 de gasto médio, mas 368,1 dias desde a última compra. Lost é o maior grupo, com 32,5%, porém responde por apenas 4,9% da receita e 1,3 pedido em média.

Essa concentração torna campanhas indiscriminadas ineficientes. Inatividade de alto valor exige uma intervenção diferente de comportamento pontual de baixo valor.

## Camada de decisão de campanha

A política combina resposta base, conversão incremental, margem, custo de contato e incentivo. São premissas de cenário registradas explicitamente, não conclusões extraídas dos dados. O cliente só é abordado quando a ação tem valor líquido esperado positivo; caso contrário, a recomendação é não abordar.

Assim, o equilíbrio entre custo e benefício pode ser revisado. As premissas podem mudar e as decisões afetadas ficam visíveis, sem esconder regras de negócio dentro de um rótulo de agrupamento.

## O que descartei

Descartei usar rótulos do k-means como resposta final. Números de grupo não têm significado estável nem explicam uma intervenção. A política RFM determinística permanece operacional por ser auditável; o agrupamento verifica se a estrutura escolhida é plausível.

Também descartei impactar todo cliente Lost. O volume parece atraente, mas baixa frequência e pequena participação na receita tornam um win-back amplo difícil de justificar. Apenas a parcela de maior valor deve passar pela regra econômica positiva.

## Validação e reprodutibilidade

O Pandera valida contratos de dados, o Parquet preserva resultados tipados e o DuckDB permite inspeção analítica. Testes, Docker e integração contínua tornam o pipeline reproduzível. Um artefato versionado de métricas conecta as afirmações do README e do portfólio aos resultados gerados.

## O que a recomendação significa

RFM descreve o comportamento passado e a política avalia cenários transparentes; nenhum dos dois é apresentado como resposta incremental ou valor do cliente ao longo do tempo. O desenho recomendado usa um grupo de controle estratificado por segmento e mede margem de contribuição incremental, com frequência de contato e descadastro como limites de segurança.
