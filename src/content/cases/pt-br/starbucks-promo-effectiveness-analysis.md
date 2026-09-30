---
locale: pt-br
slug: starbucks-promo-effectiveness-analysis
order: 4
title: Starbucks Promo Effectiveness
eyebrow: Decision Analytics
description: Uma análise observacional de promoções que atribui ofertas repetidas no grão da exposição, quantifica sinais econômicos e define o experimento necessário para uma decisão causal.
role: Analista de decisão e builder
year: 2026
dataKind: public
dataLabel: Dataset simulado de comportamento Starbucks
question: Qual oferta merece o próximo teste controlado e o que o comportamento histórico realmente consegue provar?
repoUrl: https://github.com/J0BS013/starbucks-promo-effectiveness-analysis
image: /images/projects/starbucks-promo-effectiveness-analysis.png
socialImage: /social/starbucks-promo-effectiveness-analysis.png
imageAlt: Comparação de receita observada e custo de recompensa para ofertas de desconto, BOGO e informativas.
sourceCommit: 652ff04cc5c8787233b9addbe5ee433e127f03ae
evidence:
  - label: Clientes válidos
    value: "14.825"
  - label: Exposições a ofertas
    value: "115.609"
  - label: Associação do desconto
    value: "+84,6%"
  - label: Testes automatizados
    value: "22"
limitations:
  - Comportamento observacional sem holdout randomizado; a receita reportada não é lift incremental.
---

## A decisão

A pergunta útil não era apenas qual oferta teve a maior taxa de conclusão. Era qual promoção deveria avançar para um teste controlado, sob quais limites econômicos e quanta confiança o histórico de eventos sustenta.

A recomendação é priorizar descontos no próximo teste, manter BOGO como challenger com guardrails econômicos mais rígidos e não tratar mensagens informativas como promoções geradoras de conversão. É uma decisão de priorização de teste, não de rollout.

## O problema de atribuição

Um cliente pode receber a mesma oferta várias vezes. Visualizações, transações e conclusões podem se sobrepor entre janelas ativas. Um join no nível do cliente multiplicaria resultados e faria uma oferta frequente parecer melhor apenas porque foi enviada mais vezes.

Modelei uma linha por oferta recebida, criei um identificador único de exposição e atribuí cada evento posterior à exposição elegível mais recente dentro da validade. Cada evento só pode ser atribuído uma vez. A ausência da duração interrompe o pipeline em vez de criar silenciosamente uma janela ilimitada.

## Evidências

Após os controles de qualidade demográfica, a análise cobre 14.825 clientes, 115.609 exposições e 10 ofertas. A visualização esteve associada a uma conclusão que passou de 35,4% para 62,2%, mas visualizar é um comportamento pós-exposição e não pode definir um tratamento randomizado.

Os descontos tiveram a associação observada mais forte: +84,6% entre os grupos comparados. Sob o proxy documentado de custo de recompensa, produziram cerca de US$87.670 de resultado observado e razão recompensa/receita de +89%. BOGO teve associação de +33,9%, mas cerca de -US$138.480 sob o mesmo proxy e razão de -59%.

Esses valores descrevem comportamento observado e economia de cenário. Não estimam valor causal incremental.

## Desenho da decisão

O decision memo transforma a análise em plano de teste. Clientes elegíveis devem ser randomizados antes da exposição, com intenção de tratar como análise principal. A métrica primária é margem de contribuição incremental por cliente elegível; conclusão, conversão, ticket e adesão são métricas secundárias.

Custo da recompensa, frequência de contato, descadastro e concentração adversa por segmento são guardrails. Escalar exige que o limite inferior do intervalo de confiança da margem incremental permaneça positivo sem violar esses limites.

## O que descartei

Descartei uma narrativa causal simples entre quem viu e quem não viu. A visualização acontece depois da atribuição e sofre seleção. Também descartei receita total atribuída como ROI: ela ajuda a priorizar um experimento, mas não mede lift sem um contrafactual válido.

Um módulo sintético separado demonstra randomização balanceada, estimação de efeito e planejamento de poder. Resultados causais simulados nunca são misturados às observações Starbucks.

## Qualidade de engenharia

O pipeline é reproduzível dos eventos até as exposições, figuras e decision memo. Vinte e dois testes cobrem invariantes de atribuição, cálculos econômicos e helpers causais. Alegações, premissas e limitações permanecem próximas aos outputs que qualificam.

## Limitações e próximo teste

Não há holdout randomizado, o custo da recompensa não é um modelo completo de margem e diferenças entre segmentos podem refletir composição. O próximo passo é o experimento pré-registrado de desconto—não um rollout—seguido por checagens de balanceamento, intervalos de confiança e monitoramento de guardrails.
