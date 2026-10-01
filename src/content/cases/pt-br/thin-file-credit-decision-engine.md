---
locale: pt-br
slug: thin-file-credit-decision-engine
order: 1
title: Thin-File Credit Decision Engine
eyebrow: Decision Science
description: Um simulador interativo de política de crédito que combina features point-in-time, risco calibrado, adesão e valor esperado para recomendar aprovar, verificar ou recusar.
role: Política de crédito · modelos de risco · aplicação
year: 2026
dataKind: synthetic
dataLabel: Candidatos sintéticos
question: Quem aprovar, qual primeiro limite oferecer e quando uma verificação adicional compensa o atrito?
repoUrl: https://github.com/J0BS013/thin-file-credit-decision-engine
demoUrl: https://thin-file-credit-decision.streamlit.app/
image: /images/projects/thin-file-credit-decision-engine.png
socialImage: /social/thin-file-credit-decision-engine.png
imageAlt: Simulador de decisão de crédito com recomendação, estimativas de risco e dados disponíveis no momento da decisão.
sourceCommit: 96806600894d401e71f0d572d6863ac7bcf29535
evidence:
  - label: Desenho de validação
    value: Out-of-time
  - label: Objetivo da política
    value: Valor esperado
  - label: Decisões
    value: Aprovar · verificar · recusar
scope:
  - Ambiente sintético de decisão com premissas econômicas explícitas.
---

## O que é este projeto

Thin-File Credit Decision Engine é um simulador reproduzível do caminho completo de política de crédito para candidatos com pouco histórico de bureau. Ele transforma dados disponíveis no momento da decisão em estimativas calibradas de default, fraude e adesão, depois recomenda aprovar, verificar ou recusar junto de um primeiro limite e valor esperado.

Uma probabilidade isolada não é uma decisão de crédito. A pergunta operacional é quem aprovar, quanto oferecer e se pedir mais evidências compensa a perda de conversão. Essas escolhas interagem: um threshold conservador reduz inadimplência, mas pode excluir clientes rentáveis; um limite alto pode transformar um candidato aceitável numa decisão de valor negativo.

Construí o projeto para tornar essa camada de política visível. O resultado não é apenas “risco = 12%”, mas uma recomendação de aprovar, verificar ou recusar, um valor proposto, o valor esperado e um motivo inspecionável. Toda a carteira é sintética, portanto o case demonstra método e disciplina de engenharia, não performance real de underwriting.

## Problema de negócio

Candidatos thin-file possuem pouco histórico tradicional. Bureau ausente pode indicar uma pessoa jovem e viável, não necessariamente um mau pagador. Ao mesmo tempo, pouca informação aumenta incerteza e pode elevar exposição a fraude ou default. Converter todo missing em zero criaria silenciosamente uma regra de recusa; tratá-lo como irrelevante subestimaria o risco.

A demanda também importa. Uma oferta de baixo risco não cria valor quando o cliente provavelmente não a aceita. Por isso o motor estima default, fraude e adesão separadamente e combina essas probabilidades com receita, perda e custo de verificação.

## O que construí

Desenhei o processo gerador dos dados, a camada de features point-in-time, a validação temporal, os três modelos probabilísticos e a política de decisão. Também construí o app Streamlit para que cada candidatura possa ser revisada com os inputs disponíveis naquele momento e com a razão da ação escolhida.

O repositório contém comandos reproduzíveis, testes automatizados, artefatos de modelo e política e a documentação das premissas sintéticas. O foco foi o caminho entre evidência imperfeita e recomendação auditável, não a busca por uma única métrica chamativa.

## Requisitos de projeto

Features observadas depois da candidatura não podem vazar para treino ou scoring. O período de avaliação precisa ocorrer depois do treino. Bureau ausente deve ser representado explicitamente. A política também precisa ser compreensível sem exigir engenharia reversa dos modelos.

Fairness por grupo protegido, verificação de identidade em produção e conformidade regulatória estão fora deste ambiente sintético e não são sugeridas pela interface nem pelos resultados.

## Como o motor funciona

O pipeline cria candidaturas, observações de bureau, sinais de fluxo de caixa, requisitos documentais e outcomes sintéticos. A geração de features usa somente informações disponíveis no timestamp da decisão. Os modelos estimam default, fraude e adesão; a calibração é avaliada porque valor esperado depende da qualidade da probabilidade, não apenas do ranking.

Para cada valor candidato, a política combina probabilidade de aceite, receita, perda de crédito, exposição a fraude e custo de verificação. Depois seleciona a melhor ação de valor positivo sob limites explícitos de risco. Uma política challenger pode ser comparada com a champion na mesma população out-of-time.

> O modelo descreve incerteza. A política transforma essa incerteza em ação sob restrições econômicas e de risco.

## Decisões de design

Mantive fraude e default separados porque permitem intervenções diferentes. Verificação pode reduzir fraude sem alterar o risco de pagamento. Adesão também fica separada porque representa resposta do cliente, não perda.

Escolhi validação temporal no lugar de split aleatório. Um split aleatório pode distribuir condições quase idênticas nos dois lados e superestimar a capacidade de avançar no tempo. Também tratei o tamanho do primeiro empréstimo dentro da política: uma oferta menor pode continuar rentável quando o valor solicitado não é.

## Resultados e validação

A aplicação produz métricas reproduzíveis, diagnóstico de calibração, resumo de política e comparação champion/challenger. O simulador expõe default, fraude, adesão, valor esperado, valor recomendado, necessidade de verificação e reason code.

Os testes cobrem restrições point-in-time, comportamento das features, invariantes da política e reprodutibilidade. O aviso de dados sintéticos é parte da evidência: impede que economia simulada seja confundida com impacto observado.

## Por que um bom score não bastava

Uma primeira formulação tratava o score de default como o produto: escolher um corte e aprovar tudo abaixo dele. Rejeitei esse caminho porque ele ignorava adesão, valor e custo de verificação. Também poderia aprovar casos de valor negativo somente porque o risco ficava abaixo de um limite arbitrário.

A correção foi otimizar ações, não rótulos. Cada ação passou a ter economia e restrições próprias. “Verificar” só é escolhido quando o benefício esperado da informação justifica o atrito. Uma recusa pode ocorrer por valor esperado não positivo mesmo sem um score extremo.

## Como interpretar os resultados

Todos os candidatos e outcomes são sintéticos. O projeto não estabelece discriminação, rentabilidade ou estabilidade no mundo real. Não inclui choque macroeconômico, adaptação adversarial de fraude, cobrança ou avaliação completa de fairness. Os parâmetros econômicos são inputs de cenário, não previsão contábil.

## Fronteira de produção

Uma implantação real exige avaliação em shadow mode com dados históricos consentidos e governados, além de monitoramento de aprovação, perda, fairness e adesão definido antes de qualquer mudança de política. Champion e challenger devem ser comparados em janelas idênticas, com drift e análise de overrides incluídos nos critérios de lançamento.

## Explore o projeto

O repositório contém pipeline, testes e metodologia. A demo é uma superfície interativa de revisão da política sintética e não avalia pessoas reais.
