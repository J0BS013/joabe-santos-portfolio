---
locale: pt-br
slug: marketplace-event-lakehouse
order: 3
title: Marketplace Event Lakehouse
eyebrow: Data Engineering
description: Um lakehouse replay-safe que transforma eventos duplicados, atrasados e fora de ordem em funil e receita reconciliados.
role: Pipeline de eventos · qualidade · modelos Gold
year: 2026
dataKind: generated
dataLabel: Eventos determinísticos gerados
question: Como eventos duplicados, atrasados e fora de ordem viram métricas confiáveis de funil, GMV e receita?
repoUrl: https://github.com/J0BS013/marketplace-event-lakehouse
socialImage: /social/marketplace-event-lakehouse.png
sourceCommit: 7b5a7e037408911d5ee15fdc49b015041a21f50c
evidence:
  - label: Confiabilidade
    value: MERGE replay-safe
  - label: Qualidade
    value: Quarentena + reconciliação
  - label: Performance
    value: Benchmark versionado de 100 mil
scope:
  - Carga local determinística com benchmark versionado de 100 mil eventos.
---

## O que é este projeto

Marketplace Event Lakehouse é um pipeline em Docker com PySpark, Delta Lake e Prefect para eventos comportamentais de marketplace. Ele ingere lotes ruidosos, preserva a evidência bruta, coloca registros inválidos em quarentena e produz modelos replay-safe de pedidos, receita e funil sensível à sequência.

Um marketplace precisa saber onde compradores abandonam a jornada, quanto GMV foi criado e quanta receita pode ser reconhecida. Essas decisões só são defensáveis quando o pipeline lida com duplicatas, atrasos e sequências impossíveis sem alterar silenciosamente resultados anteriores.

Construí o lakehouse para tornar confiabilidade visível. O objetivo não é exibir três pastas chamadas Bronze, Silver e Gold, mas provar que reprocessar o mesmo input não duplica fatos, que rejeições são explicáveis e que o funil respeita uma jornada possível.

## Por que eventos são difíceis

Eventos têm dois relógios. Event time indica quando a pessoa agiu; ingestion time, quando a plataforma recebeu o registro. Um checkout atrasado pode chegar num lote posterior e um retry pode duplicar o mesmo evento. Atributos de seller e produto também mudam depois da compra e precisam ser reconstruídos historicamente.

Contagens ingênuas transformam problemas técnicos em comportamento aparente. Duplicatas inflam GMV, dimensões atuais reescrevem o passado e contagens independentes podem mostrar mais checkouts que carts.

## O que construí

Desenhei o gerador determinístico, transformações PySpark, tabelas Delta, orquestração Prefect e modelos Gold. Especifiquei regras de qualidade, quarentena, metadados de execução, alertas de SLA e um benchmark versionado. Também escrevi testes e runbook de recuperação.

A pergunta central de engenharia foi como tornar retry seguro, porque retries são comportamento operacional normal, não uma exceção rara.

## Requisitos de projeto

O projeto roda em Docker local e precisa equilibrar arquitetura realista com execução acessível. Os eventos são gerados, não capturados de um marketplace. O benchmark descreve o ambiente documentado e não um cluster Spark gerenciado.

O pipeline deve preservar evidência bruta, isolar inválidos, permitir backfill e evitar efeitos colaterais em reruns. Gold precisa reconciliar com eventos aceitos em Silver, não com o Bronze ruidoso.

## Como o lakehouse funciona

Bronze armazena eventos imutáveis com payload, event time, ingestion time e run metadata. Silver valida schemas, normaliza, deduplica IDs, aplica watermark e envia linhas inválidas ou excessivamente atrasadas para quarentena. `MERGE` no Delta torna a escrita idempotente.

Dimensões de seller e produto usam SCD Type 2 para resolver a versão válida no event time. Sessionization organiza jornadas. Gold produz pedidos, receita diária e funil cumulativo em que cada etapa depende da anterior na sequência válida.

Prefect coordena etapas e registra leituras, escritas, duplicatas, atrasos, rejeições, freshness e alertas. O runbook cobre retry, backfill e falhas comuns.

## Decisões de design

Mantive os dois relógios: event time representa a verdade comportamental; ingestion time permite diagnóstico operacional. Watermark é uma política com quarentena explícita, não um filtro silencioso.

Escolhi Bronze imutável e merges idempotentes em Silver. Sobrescrever o raw simplificaria o curto prazo, mas removeria a evidência necessária para explicar rejeições. Para o funil, rejeitei contagens diárias independentes e passei a avaliar milestones ordenados dentro da sessão.

## Resultados e validação

O smoke run informa linhas lidas e escritas por camada, duplicatas, atrasos, rejeições, versões de dimensões e tamanhos de Gold. Modelos de receita reconciliam com pedidos pagos. Replay preserva cardinalidade porque chaves estáveis orientam os merges.

O repositório inclui benchmark de 100 mil eventos com ambiente e tempos. Ele serve para detectar regressão, não para alegar escala de cloud. Testes cobrem idempotência, quarentena, intervalos SCD2, funis e reconciliação.

## Quando checkout ficou maior que cart

Uma primeira versão agrupava eventos por dia e contava cada tipo separadamente. Como eventos chegavam tarde ou pertenciam a sessões diferentes, o resultado podia ter mais checkouts que carts. A agregação fazia exatamente o que estava escrito, mas a métrica não representava uma jornada.

Substituí as contagens por milestones cumulativos e sensíveis à sequência. Uma sessão precisa conter o pré-requisito antes da próxima etapa. Um teste de regressão protege essa ordem. A correção mudou a lógica e a definição comunicada aos consumidores.

## Como interpretar o benchmark

O gerador não reproduz toda falha de produção. O benchmark local não comprova autoscaling, throughput de cloud ou concorrência. Identity stitching é simplificado, e a janela de sessão é uma regra de negócio escolhida. Não há streaming, schema registry corporativo ou plataforma completa de observabilidade.

## Fronteira de produção

Num ambiente real, eu validaria o contrato com os produtores, publicaria regras de compatibilidade e faria replay de uma partição histórica representativa junto ao warehouse atual. Também definiria budgets de custo e latência, monitoraria a composição da quarentena e atribuiria ownership a cada SLA.

## Explore o projeto

O repositório contém ambiente Docker, carga gerada, orquestração, testes, benchmark e runbook. O diagrama corresponde às camadas implementadas no commit indicado.
