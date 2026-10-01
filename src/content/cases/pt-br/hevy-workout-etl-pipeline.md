---
locale: pt-br
slug: hevy-workout-etl-pipeline
order: 6
title: Hevy Workout ETL
eyebrow: Data Product
description: Um produto resiliente da API ao dashboard que protege o histórico de treinos, promove outputs Medallion confiáveis e apresenta progressão em uma aplicação interativa.
role: Ingestão de API · modelos Medallion · dashboard
year: 2026
dataKind: generated
dataLabel: Snapshot pessoal de treinos versionado
question: Como manter um dataset vindo de API completo, reproduzível e útil quando a extração falha no meio?
repoUrl: https://github.com/J0BS013/hevy-workout-etl-pipeline
demoUrl: https://hevy-workout-dashboard-j0bs013.streamlit.app/
image: /images/projects/hevy-workout-etl-pipeline.png
socialImage: /social/hevy-workout-etl-pipeline.png
imageAlt: Dashboard Hevy Workout Analytics com frequência, volume, progressão e consistência.
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
  - Snapshot pessoal versionado; o app público não exige acesso à API privada.
---

## O que é este projeto

O projeto transforma o histórico da API Hevy em um produto analítico durável. É um sistema ETL e também algo concreto para usar: um dashboard Streamlit com quatro abas para frequência, volume, progressão por exercício e consistência estatística.

O app público lê outputs Gold e Analytics commitados. Nunca precisa da credencial privada da API, o que mantém o deploy seguro e a demonstração reproduzível.

## O problema de confiabilidade

APIs paginadas podem falhar depois de várias páginas bem-sucedidas. Salvar essa resposta parcial como novo snapshot apagaria silenciosamente o histórico e geraria gráficos convincentes, porém errados. A extração só retorna sucesso depois que todas as páginas terminam.

Cada página obrigatória tem timeout de 15 segundos. Apenas rate limit, erro de servidor e timeout recebem retry exponencial; autenticação e erros não recuperáveis falham imediatamente. Novos Parquets são promovidos atomicamente, então uma escrita com erro preserva o último snapshot confiável.

## Arquitetura de dados

Bronze preserva o histórico no formato da API. Silver padroniza tipos, valida chaves e rejeita registros inválidos. Gold produz fatos de treino, exercício e grupo muscular em grãos documentados. Analytics deriva volume semanal, recordes, tendências e medidas de consistência.

O dashboard consome somente Gold e Analytics. Essa fronteira tira lógica de apresentação da ingestão e permite que os testes validem as mesmas tabelas vistas pelo usuário.

## Resultados e validação

O snapshot publicado contém 510 treinos de outubro de 2023 a março de 2026 e 4,33 milhões de quilos de volume registrado. A camada analítica avalia o histórico de 99 exercícios; 49 apresentam tendência temporal estatisticamente significativa sob a regra OLS definida.

A interface oferece Overview, Volume, Progression e Analytics. Os filtros mudam a janela de análise sem alterar o snapshot de origem. Cinquenta e seis testes automatizados cobrem API, transformações, qualidade e analytics sem chamar o serviço ao vivo.

## Camada estatística

A progressão é estimada por exercício com mínimos quadrados ordinários ao longo do tempo. Cada output contém inclinação, R², p-valor e flag de significância em p < 0,05. Tendência de volume semanal, recordes e coeficiente de variação complementam a leitura sem resumir progresso em uma nota única.

Essas estatísticas descrevem o histórico registrado. Não provam que um programa causou uma mudança nem que toda inclinação significativa seja relevante na prática.

## Decisão de design

Descartei um app que consultasse a API a cada abertura. Isso acoplaria a disponibilidade a um terceiro, arriscaria credenciais e faria o resultado mudar sem uma fronteira versionada. Também descartei CSV como contrato porque ele perde tipos importantes entre camadas.

O desenho escolhido torna freshness explícito. Um repositório verde indica código testado e snapshot versionado saudável; não significa ingestão contínua de novos treinos privados.

## Como interpretar o dashboard

O dashboard descreve um histórico de treino versionado; é um produto analítico, não uma recomendação de treino. OLS não atribui mudanças ao programa e pode refletir lesões ou substituições. A ingestão privada agendada pode atualizar o snapshot enquanto o deploy publica apenas agregados anônimos, mantendo dados brutos e credenciais fora do app público.
