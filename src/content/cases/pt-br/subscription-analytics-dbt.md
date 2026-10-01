---
locale: pt-br
slug: subscription-analytics-dbt
order: 2
title: Subscription Analytics with dbt
eyebrow: Analytics Engineering
description: Um produto analítico com dbt e DuckDB que entrega MRR, NRR, churn e cohorts reconciliados por meio de marts testados e um dashboard interativo.
role: Contratos de métricas · modelos dbt · dashboard
year: 2026
dataKind: synthetic
dataLabel: Fixtures sintéticas versionadas
question: Finance e Produto podem confiar em MRR, NRR, churn e retenção quando os dados mudam e chegam atrasados?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
socialImage: /social/subscription-analytics-dbt.png
imageAlt: Dashboard de assinaturas com MRR final, NRR, receita paga e ponte mensal de movimentos de MRR.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Validação do build
    value: 76 nós aprovados
  - label: Controle da métrica
    value: MRR bridge reconciliado
  - label: Histórico
    value: Snapshot SCD Type 2
scope:
  - Fixtures sintéticas versionadas executadas localmente no DuckDB.
---

## O que é este projeto

Subscription Analytics with dbt é um produto analítico autocontido para receita recorrente. Ele transforma dados versionados de assinaturas, invoices, clientes e eventos em marts testados de MRR, NRR, churn, receita paga e retenção de cohort, consumidos pela documentação dbt e por um dashboard interativo.

Finance e Produto precisam responder da mesma forma a perguntas aparentemente simples: quanto de receita recorrente encerrou o mês, o que mudou esse saldo e quantos clientes permaneceram ativos. Quando MRR, NRR e retenção de cohort usam populações diferentes, toda decisão posterior vira uma discussão sobre definições.

Construí este projeto como produto analítico compacto, não como uma coleção de SQLs. Ele transforma fixtures versionadas de assinaturas, invoices, clientes e eventos em marts reconciliados, métricas documentadas, testes e um dashboard que lê apenas dessas camadas confiáveis.

## Por que métricas de assinatura quebram

Métricas de assinatura misturam saldos, movimentos e populações. MRR final é saldo e não deve ser somado entre meses. New, expansion, contraction, churn e reactivation são movimentos que precisam reconciliar abertura e fechamento. NRR pode ficar acima de 100% quando expansão compensa perdas, mesmo com queda na retenção de clientes.

Eventos atrasados criam outro risco. Reprocessar tudo é caro, mas usar apenas timestamps maiores que o máximo anterior perde eventos que chegaram tarde. Atributos de clientes também mudam; guardar somente a linha atual apaga o contexto histórico.

## O que construí

Defini contratos de métricas, organizei source, staging, intermediate e marts, implementei movimentos e snapshot de clientes e adicionei testes para invariantes de negócio. Também criei um dashboard Streamlit que consome os marts em vez de duplicar lógica na visualização.

O repositório roda com dbt e DuckDB sem credenciais de cloud. Fixtures versionadas permitem revisar falhas no CI e repetir a execução em clone limpo.

## Requisitos de projeto

O resultado precisa ser idêntico localmente e no GitHub Actions. Embora pequenos e sintéticos, os dados devem demonstrar padrões transferíveis: staging tipado, chaves estáveis, grãos explícitos, lookback incremental, slowly changing dimensions e reconciliação.

O dashboard comprova consumo; não substitui a documentação do dbt. DuckDB valida comportamento, não custo, concorrência ou performance de um warehouse real.

## Como o produto de dados funciona

Staging renomeia e tipa campos preservando o significado de origem. Intermediate constrói períodos de assinatura, atividade e movimentos mensais. Marts expõem fatos de assinatura, eventos, MRR bridge, cohort retention, churn e revenue retention.

O modelo de eventos é incremental com lookback para reconsiderar chegadas tardias. Um snapshot mantém histórico de clientes como SCD Type 2. Testes cobrem unicidade, nulos, valores aceitos, relacionamentos e regras como a reconciliação dos movimentos de MRR.

O app lê os marts do DuckDB e diferencia saldo, movimento e taxa. Não existe uma segunda implementação da métrica em Python.

## Decisões de métricas

Modelei movimentos explicitamente em vez de inferi-los no gráfico. Assim cada customer-month recebe uma classificação auditável. Fixei o denominador de cada cohort no mês de entrada; ele não diminui quando clientes saem. Para late-arriving events, escolhi lookback limitado: full refresh é simples e caro; corte estrito é eficiente e incorreto.

## Resultados e validação

O build em ambiente limpo termina com 76 nós dbt aprovados, incluindo modelos, seeds, snapshots e testes. O MRR bridge reconcilia movimentos com a variação do saldo. O snapshot preserva histórico, e a documentação expõe lineage, colunas e testes.

O dashboard mostra MRR final, NRR, receita paga, cohort retention e a ponte de movimentos. Os valores vêm de fixtures sintéticas identificadas como tal e demonstram consumo dos marts sem transferir regra de negócio para a interface.

## O bug do denominador

Uma versão anterior contava apenas os clientes ainda visíveis em cada mês de atividade. O denominador caía junto com o numerador e fazia a retenção tardia parecer melhor. A query era válida e o gráfico plausível — justamente por isso o erro era perigoso.

Corrigi o modelo materializando o tamanho original do cohort e ligando todos os períodos a esse denominador fixo. Um teste semântico protege o comportamento esperado. O episódio mostra por que um dashboard bonito ainda pode estar errado quando o contrato populacional é implícito.

## Como interpretar as métricas

Os dados são sintéticos e cobrem poucos meses. Câmbio usa fixture; impostos, refunds, créditos e alterações contratuais são simplificados. O engine local não demonstra permissões, custo ou orquestração de warehouse. NRR acima de 100% não representa crescimento de uma empresa real.

## Fronteira de produção

A adoção em produção exige mapear os contratos ao modelo de eventos do billing, alinhar cutoffs com Finance, adicionar freshness e thresholds de anomalia e validar backfills contra fechamentos aprovados. Estratégias incrementais específicas do warehouse e controle de acesso vêm depois dessa reconciliação.

## Explore o projeto

O repositório contém SQL, testes, fixtures, documentação e CI. A demo é uma camada de apresentação sobre marts testados.
