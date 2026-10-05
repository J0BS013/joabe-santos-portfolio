---
locale: pt-br
slug: marketplace-event-lakehouse
order: 3
title: Lakehouse de Eventos do Marketplace
eyebrow: Data Engineering
description: Um lakehouse que pode reprocessar eventos com segurança e transforma duplicatas, atrasos e registros fora de ordem em métricas reconciliadas de funil e receita.
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
  - label: Desempenho
    value: Teste versionado com 100 mil eventos
scope:
  - Carga local reproduzível com teste de desempenho versionado de 100 mil eventos.
---

## O que é este projeto

O Lakehouse de Eventos do Marketplace é um pipeline em Docker com PySpark, Delta Lake e Prefect para eventos de comportamento. Ele recebe lotes com problemas, preserva os dados brutos, coloca registros inválidos em quarentena e produz modelos de pedidos, receita e funil que podem ser reprocessados sem duplicação.

Um marketplace precisa saber onde compradores abandonam a jornada, quanto GMV foi criado e quanta receita pode ser reconhecida. Essas decisões só são defensáveis quando o pipeline lida com duplicatas, atrasos e sequências impossíveis sem alterar silenciosamente resultados anteriores.

Construí o lakehouse para tornar confiabilidade visível. O objetivo não é exibir três pastas chamadas Bronze, Silver e Gold, mas provar que reprocessar o mesmo input não duplica fatos, que rejeições são explicáveis e que o funil respeita uma jornada possível.

## Por que eventos são difíceis

Eventos têm dois horários importantes: quando a pessoa agiu e quando a plataforma recebeu o registro. Uma finalização de compra atrasada pode chegar em outro lote, e uma nova tentativa de envio pode duplicar o mesmo evento. Atributos de vendedores e produtos também mudam depois da compra e precisam ser reconstruídos historicamente.

Contagens ingênuas transformam problemas técnicos em comportamento aparente. Duplicatas inflam GMV, dimensões atuais reescrevem o passado e contagens independentes podem mostrar mais checkouts que carts.

## O que construí

Desenhei o gerador determinístico, as transformações em PySpark, as tabelas Delta, a orquestração com Prefect e os modelos Gold. Especifiquei regras de qualidade, quarentena, metadados de execução, alertas de nível de serviço e um teste de desempenho versionado. Também escrevi os testes e o guia de recuperação.

A pergunta central de engenharia foi como tornar o reprocessamento seguro, porque novas tentativas fazem parte da operação normal e não são uma exceção rara.

## Requisitos de projeto

O projeto roda em Docker local e equilibra uma arquitetura realista com uma execução acessível. Os eventos são gerados, não capturados de um marketplace. O teste de desempenho descreve o ambiente documentado, não um cluster Spark gerenciado.

O pipeline deve preservar os dados brutos, isolar registros inválidos, permitir recomposição histórica e evitar efeitos colaterais em novas execuções. A camada Gold precisa reconciliar com eventos aceitos em Silver, não com o Bronze ainda não tratado.

## Como o lakehouse funciona

Bronze armazena eventos imutáveis com conteúdo, horário do evento, horário de ingestão e metadados da execução. Silver valida esquemas, normaliza campos, remove IDs duplicados, aplica a política de atraso e envia linhas inválidas ou excessivamente tardias para quarentena. O `MERGE` do Delta torna a escrita idempotente.

As dimensões de vendedor e produto usam SCD Tipo 2 para recuperar a versão válida no momento do evento. A divisão em sessões organiza as jornadas. Gold produz pedidos, receita diária e um funil cumulativo em que cada etapa depende da anterior na sequência correta.

O Prefect coordena as etapas e registra leituras, escritas, duplicatas, atrasos, rejeições, atualização dos dados e alertas. O guia operacional cobre novas tentativas, recomposição histórica e falhas comuns.

## Decisões de design

Mantive os dois horários: o momento do evento representa o comportamento do usuário; o momento da ingestão permite o diagnóstico operacional. A tolerância a atrasos é uma política com quarentena explícita, não um filtro silencioso.

Escolhi Bronze imutável e merges idempotentes em Silver. Sobrescrever o raw simplificaria o curto prazo, mas removeria a evidência necessária para explicar rejeições. Para o funil, rejeitei contagens diárias independentes e passei a avaliar milestones ordenados dentro da sessão.

## Resultados e validação

O smoke run informa linhas lidas e escritas por camada, duplicatas, atrasos, rejeições, versões de dimensões e tamanhos de Gold. Modelos de receita reconciliam com pedidos pagos. Replay preserva cardinalidade porque chaves estáveis orientam os merges.

O repositório inclui benchmark de 100 mil eventos com ambiente e tempos. Ele serve para detectar regressão, não para alegar escala de cloud. Testes cobrem idempotência, quarentena, intervalos SCD2, funis e reconciliação.

## Quando checkout ficou maior que cart

Uma primeira versão agrupava eventos por dia e contava cada tipo separadamente. Como eventos chegavam tarde ou pertenciam a sessões diferentes, o resultado podia ter mais checkouts que carts. A agregação fazia exatamente o que estava escrito, mas a métrica não representava uma jornada.

Substituí as contagens por milestones cumulativos e sensíveis à sequência. Uma sessão precisa conter o pré-requisito antes da próxima etapa. Um teste de regressão protege essa ordem. A correção mudou a lógica e a definição comunicada aos consumidores.

## Como interpretar o teste de desempenho

O gerador não reproduz toda falha de produção. O benchmark local não comprova autoscaling, throughput de cloud ou concorrência. Identity stitching é simplificado, e a janela de sessão é uma regra de negócio escolhida. Não há streaming, schema registry corporativo ou plataforma completa de observabilidade.

## Fronteira de produção

Em produção, o contrato deve ser validado com os produtores, as regras de compatibilidade precisam ser publicadas e uma partição histórica representativa deve ser reprocessada junto ao data warehouse atual. O modelo operacional também precisa definir limites de custo e latência, monitorar a quarentena e atribuir um responsável a cada SLA.

## Explore o projeto

O repositório contém o ambiente Docker, a carga gerada, a orquestração, os testes, a medição de desempenho e o guia operacional. O diagrama corresponde às camadas implementadas na versão indicada.
