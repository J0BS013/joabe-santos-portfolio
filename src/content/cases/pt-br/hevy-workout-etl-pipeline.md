---
locale: pt-br
slug: hevy-workout-etl-pipeline
order: 6
title: ETL de Treinos do Hevy
eyebrow: Data Product
description: Um produto de dados resiliente que extrai treinos da API, protege o histórico, organiza camadas Medallion confiáveis e apresenta a evolução em uma aplicação interativa.
role: Ingestão de API · modelos Medallion · painel
year: 2026
dataKind: generated
dataLabel: Histórico pessoal de treinos versionado
question: Como manter os dados de uma API completos, reproduzíveis e úteis quando a extração falha no meio?
repoUrl: https://github.com/J0BS013/hevy-workout-etl-pipeline
demoUrl: https://hevy-workout-dashboard-j0bs013.streamlit.app/
image: /images/projects/hevy-workout-etl-pipeline.png
socialImage: /social/hevy-workout-etl-pipeline.png
imageAlt: Painel de treinos do Hevy com frequência, volume, progressão e consistência.
sourceCommit: 5618eb64288cc15af1accc0203d7cdd1955783ce
evidence:
  - label: Treinos versionados
    value: "510"
  - label: Período histórico
    value: "2023–2026"
  - label: Modelos analíticos
    value: "99 exercícios"
  - label: Testes automatizados
    value: "56"
scope:
  - Histórico pessoal versionado; o aplicativo público não exige acesso à API privada.
---

## O que é este projeto

O projeto transforma o histórico da API do Hevy em um produto analítico durável. É um sistema ETL e também algo concreto para usar: um painel em Streamlit com quatro abas para frequência, volume, progressão por exercício e consistência estatística.

O aplicativo público lê apenas os dados versionados das camadas Gold e Analytics. Ele nunca precisa da credencial privada da API, o que mantém a publicação segura e a demonstração reproduzível.

## O problema de confiabilidade

APIs paginadas podem falhar depois de várias páginas bem-sucedidas. Salvar uma resposta parcial como novo histórico apagaria dados anteriores e geraria gráficos convincentes, porém errados. A extração só retorna sucesso depois que todas as páginas terminam.

Cada página obrigatória tem limite de 15 segundos. Apenas excesso de requisições, erro de servidor e expiração de tempo recebem novas tentativas com espera crescente; autenticação e erros não recuperáveis falham imediatamente. Novos arquivos Parquet são publicados de forma atômica, então uma escrita com erro preserva o último histórico confiável.

## Arquitetura de dados

Bronze preserva o histórico no formato da API. Silver padroniza tipos, valida chaves e rejeita registros inválidos. Gold produz fatos de treino, exercício e grupo muscular em grãos documentados. Analytics deriva volume semanal, recordes, tendências e medidas de consistência.

O painel consome somente Gold e Analytics. Essa fronteira separa a apresentação da ingestão e permite que os testes validem as mesmas tabelas vistas pelo usuário.

## Resultados e validação

O histórico publicado contém 510 treinos de outubro de 2023 a março de 2026 e 4,33 milhões de quilos de volume registrado. A camada analítica avalia 99 exercícios; 49 apresentam tendência temporal estatisticamente significativa segundo a regra OLS definida.

A interface oferece Visão geral, Volume, Progressão e Análises. Os filtros mudam a janela de análise sem alterar o histórico de origem. Cinquenta e seis testes automatizados cobrem API, transformações, qualidade e análises sem chamar o serviço ao vivo.

## Camada estatística

A progressão é estimada por exercício com mínimos quadrados ordinários ao longo do tempo. Cada resultado contém inclinação, R², valor p e um indicador de significância quando p < 0,05. A tendência de volume semanal, os recordes e o coeficiente de variação complementam a leitura sem resumir o progresso em uma nota única.

Essas estatísticas descrevem o histórico registrado. Não provam que um programa causou uma mudança nem que toda inclinação significativa seja relevante na prática.

## Decisão de design

Descartei um app que consultasse a API a cada abertura. Isso acoplaria a disponibilidade a um terceiro, arriscaria credenciais e faria o resultado mudar sem uma fronteira versionada. Também descartei CSV como contrato porque ele perde tipos importantes entre camadas.

O desenho escolhido torna a atualização dos dados explícita. Um repositório verde indica código testado e histórico versionado saudável; não significa ingestão contínua de novos treinos privados.

## Como interpretar o painel

O painel descreve um histórico de treino versionado; é um produto analítico, não uma recomendação de treino. OLS não atribui mudanças ao programa e pode refletir lesões ou substituições. Uma ingestão privada agendada pode atualizar o histórico enquanto a publicação expõe apenas dados agregados e anônimos, mantendo dados brutos e credenciais fora do aplicativo público.
