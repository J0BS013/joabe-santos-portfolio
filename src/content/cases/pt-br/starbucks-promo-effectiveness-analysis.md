---
locale: pt-br
slug: starbucks-promo-effectiveness-analysis
order: 4
title: Efetividade das Promoções Starbucks
eyebrow: Decision Analytics
description: Uma análise observacional que atribui ofertas repetidas a cada exposição, quantifica sinais econômicos e define o experimento necessário para uma decisão causal.
role: Atribuição · economia · desenho experimental
year: 2026
dataKind: public
dataLabel: Dados simulados de comportamento Starbucks
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
scope:
  - Comportamento observado usado para priorizar um experimento controlado.
---

## O que é este projeto

Efetividade das Promoções Starbucks é uma análise completa de exposições promocionais repetidas. Ela reconstrói a qual oferta pertence cada visualização, transação e conclusão, compara campanhas de desconto, BOGO e informativas e transforma os achados observacionais em uma recomendação de teste controlado.

A pergunta útil não é apenas qual oferta teve a maior taxa de conclusão. É qual promoção deve avançar para um teste controlado, sob quais limites econômicos e quanta confiança o histórico de eventos sustenta.

A recomendação é priorizar descontos no próximo teste, manter BOGO como alternativa com limites econômicos mais rígidos e não tratar mensagens informativas como promoções geradoras de conversão. É uma decisão sobre qual experimento realizar, não uma recomendação de implantação imediata.

## O problema de atribuição

Um cliente pode receber a mesma oferta várias vezes. Visualizações, transações e conclusões podem se sobrepor entre janelas ativas. Um join no nível do cliente multiplicaria resultados e faria uma oferta frequente parecer melhor apenas porque foi enviada mais vezes.

Modelei uma linha por oferta recebida, criei um identificador único de exposição e atribuí cada evento posterior à exposição elegível mais recente dentro da validade. Cada evento só pode ser atribuído uma vez. A ausência da duração interrompe o pipeline em vez de criar silenciosamente uma janela ilimitada.

## Principais achados

Após os controles de qualidade demográfica, a análise cobre 14.825 clientes, 115.609 exposições e 10 ofertas. A visualização esteve associada a uma conclusão que passou de 35,4% para 62,2%, mas visualizar é um comportamento pós-exposição e não pode definir um tratamento randomizado.

Os descontos tiveram a associação observada mais forte: +84,6% entre os grupos comparados. Sob o proxy documentado de custo de recompensa, produziram cerca de US$87.670 de resultado observado e razão recompensa/receita de +89%. BOGO teve associação de +33,9%, mas cerca de -US$138.480 sob o mesmo proxy e razão de -59%.

Esses valores descrevem comportamento observado e economia de cenário. Não estimam valor causal incremental.

## Desenho do experimento

O memorando de decisão transforma a análise em um plano de teste. Os clientes elegíveis devem ser distribuídos aleatoriamente antes da exposição, usando intenção de tratar como análise principal. A métrica primária é a margem de contribuição incremental por cliente elegível; conclusão, conversão, valor do pedido e adesão são métricas secundárias.

Custo da recompensa, frequência de contato, descadastro e concentração adversa por segmento funcionam como limites de segurança. Ampliar a campanha exige que o limite inferior do intervalo de confiança da margem incremental permaneça positivo sem violar esses critérios.

## O que descartei

Descartei uma narrativa causal simples entre quem viu e quem não viu. A visualização acontece depois da atribuição e sofre seleção. Também descartei receita total atribuída como ROI: ela ajuda a priorizar um experimento, mas não mede lift sem um contrafactual válido.

Um módulo sintético separado demonstra randomização balanceada, estimação de efeito e planejamento de poder. Resultados causais simulados nunca são misturados às observações Starbucks.

## Validação e reprodutibilidade

O pipeline é reproduzível desde os eventos até as exposições, figuras e o memorando de decisão. Vinte e dois testes cobrem regras de atribuição, cálculos econômicos e funções de análise causal. Alegações, premissas e alcance da evidência permanecem próximos aos resultados que qualificam.

## O que a recomendação significa

A análise sustenta priorizar um experimento pré-registrado de desconto, não declarar um vencedor para implantação. Uma decisão válida usa um grupo de controle aleatório, definição completa da margem de contribuição, checagens de equilíbrio, intervalos de confiança e monitoramento dos limites de segurança no tamanho de amostra planejado.
