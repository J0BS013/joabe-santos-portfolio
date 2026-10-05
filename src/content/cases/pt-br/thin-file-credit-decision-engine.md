---
locale: pt-br
slug: thin-file-credit-decision-engine
order: 1
title: Motor de Decisão de Crédito para Pouco Histórico
eyebrow: Decision Science
description: Um simulador interativo de política de crédito que combina dados disponíveis no momento da decisão, risco calibrado, adesão e valor esperado para recomendar aprovação, verificação ou recusa.
role: Política de crédito · modelos de risco · simulador
year: 2026
dataKind: synthetic
dataLabel: Candidatos sintéticos
question: Quem aprovar, qual primeiro limite oferecer e quando uma verificação adicional compensa o atrito?
repoUrl: https://github.com/J0BS013/thin-file-credit-decision-engine
demoUrl: https://thin-file-credit-decision.streamlit.app/
image: /images/projects/thin-file-credit-decision-engine.png
socialImage: /social/thin-file-credit-decision-engine.png
imageAlt: Simulador de crédito com recomendação, estimativas de risco e dados disponíveis no momento da decisão.
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

O Motor de Decisão de Crédito para Pouco Histórico simula, de forma reproduzível, todo o processo de análise de candidatos com histórico de crédito limitado. Ele transforma os dados disponíveis naquele momento em estimativas calibradas de inadimplência, fraude e adesão; depois recomenda aprovação, verificação adicional ou recusa, com um primeiro limite e o valor esperado da decisão.

Uma probabilidade isolada não é uma decisão de crédito. A pergunta operacional é quem aprovar, quanto oferecer e se pedir mais evidências compensa a perda de conversão. Essas escolhas interagem: um threshold conservador reduz inadimplência, mas pode excluir clientes rentáveis; um limite alto pode transformar um candidato aceitável numa decisão de valor negativo.

Construí o projeto para tornar essa política visível. O resultado não é apenas “risco = 12%”, mas uma ação recomendada, um valor proposto, o retorno esperado e uma justificativa verificável. Toda a carteira é sintética: o estudo demonstra método e disciplina de engenharia, não desempenho real de concessão de crédito.

## Problema de negócio

Candidatos com pouco histórico possuem poucas informações tradicionais de crédito. A ausência de dados de birô pode indicar uma pessoa jovem e viável, não necessariamente um mau pagador. Ao mesmo tempo, pouca informação aumenta a incerteza e pode elevar a exposição a fraude ou inadimplência. Converter todo valor ausente em zero criaria silenciosamente uma regra de recusa; tratá-lo como irrelevante subestimaria o risco.

A demanda também importa. Uma oferta de baixo risco não cria valor quando o cliente provavelmente não a aceita. Por isso o motor estima inadimplência, fraude e adesão separadamente e combina essas probabilidades com receita, perda e custo de verificação.

## O que construí

Desenhei o processo de geração dos dados, as variáveis disponíveis no momento da decisão, a validação temporal, os três modelos probabilísticos e a política de decisão. Também construí o aplicativo em Streamlit para revisar cada solicitação, os dados utilizados e o motivo da ação escolhida.

O repositório contém comandos reproduzíveis, testes automatizados, artefatos de modelo e política e a documentação das premissas sintéticas. O foco foi o caminho entre evidência imperfeita e recomendação auditável, não a busca por uma única métrica chamativa.

## Requisitos de projeto

Informações observadas depois da solicitação não podem vazar para o treinamento nem para a pontuação. O período de avaliação precisa ocorrer depois do período de treino. A ausência de dados de bureau deve ser representada explicitamente. A política também precisa ser compreensível sem exigir engenharia reversa dos modelos.

Análises de equidade entre grupos protegidos, verificação de identidade em produção e conformidade regulatória estão fora deste ambiente sintético e não são sugeridas pela interface nem pelos resultados.

## Como o motor funciona

O pipeline cria solicitações, informações de birô, sinais de fluxo de caixa, requisitos documentais e resultados sintéticos. As variáveis usam somente informações disponíveis no instante da decisão. Os modelos estimam inadimplência, fraude e adesão; a calibração é avaliada porque o valor esperado depende da qualidade das probabilidades, não apenas da ordenação dos candidatos.

Para cada valor possível, a política combina probabilidade de aceite, receita, perda de crédito, exposição a fraude e custo de verificação. Depois seleciona a melhor ação com valor positivo dentro de limites explícitos de risco. A política alternativa é comparada com a política vigente na mesma população de validação temporal.

> O modelo descreve incerteza. A política transforma essa incerteza em ação sob restrições econômicas e de risco.

## Decisões de design

Mantive fraude e inadimplência separadas porque permitem intervenções diferentes. A verificação pode reduzir fraude sem alterar o risco de pagamento. A adesão também fica separada porque representa a resposta do cliente, não uma perda.

Escolhi validação temporal no lugar de uma divisão aleatória. Uma divisão aleatória pode distribuir condições quase idênticas nos dois lados e superestimar a capacidade de avançar no tempo. Também tratei o tamanho do primeiro empréstimo dentro da política: uma oferta menor pode continuar rentável quando o valor solicitado não é.

## Resultados e validação

O aplicativo produz métricas reproduzíveis, diagnósticos de calibração, um resumo da política e a comparação entre as duas versões. O simulador mostra risco de inadimplência, fraude, adesão, valor esperado, limite recomendado, necessidade de verificação e motivo da decisão.

Os testes cobrem restrições temporais, comportamento das variáveis, regras permanentes da política e reprodutibilidade. O aviso de dados sintéticos faz parte da evidência: impede que resultados simulados sejam confundidos com impacto observado.

## Por que uma boa pontuação de risco não bastava

Uma primeira formulação tratava a pontuação de inadimplência como o produto: escolher um corte e aprovar tudo abaixo dele. Rejeitei esse caminho porque ele ignorava adesão, valor e custo de verificação. Também poderia aprovar casos de valor negativo somente porque o risco ficava abaixo de um limite arbitrário.

A correção foi otimizar ações, não rótulos. Cada ação passou a ter retorno e restrições próprios. “Verificar” só é escolhido quando o benefício esperado da informação justifica o atrito. Uma recusa pode ocorrer por valor esperado não positivo mesmo sem uma pontuação de risco extrema.

## Como interpretar os resultados

Todos os candidatos e resultados são sintéticos. O projeto não estabelece equidade, rentabilidade ou estabilidade no mundo real. Não inclui choques macroeconômicos, adaptação de fraude, cobrança ou uma avaliação completa de equidade. Os parâmetros econômicos são premissas de cenário, não previsões contábeis.

## Fronteira de produção

Uma implantação real exige avaliação paralela, sem afetar decisões, usando dados históricos consentidos e governados. Também exige monitoramento de aprovação, perda, equidade e adesão antes de qualquer mudança. A política vigente e a alternativa devem ser comparadas nas mesmas janelas, com alertas de mudança de comportamento e análise das decisões revisadas manualmente.

## Explore o projeto

O repositório contém o pipeline, os testes e a metodologia. A demonstração permite revisar a política sintética de forma interativa e não avalia pessoas reais.
