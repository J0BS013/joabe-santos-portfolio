---
locale: pt-br
slug: subscription-analytics-dbt
order: 2
title: Subscription Analytics with dbt
eyebrow: Analytics Engineering
description: Uma camada testada para MRR, NRR, churn e cohorts, com contratos explícitos e tratamento de dados atrasados.
role: Analytics engineer
year: 2026
dataKind: synthetic
dataLabel: Fixtures sintéticas versionadas
question: Finance e Produto podem confiar em MRR, NRR, churn e retenção quando os dados mudam e chegam atrasados?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
imageAlt: Dashboard de assinaturas com MRR final, NRR, receita paga e ponte mensal de movimentos de MRR.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Validação do build
    value: 76 nós aprovados
  - label: Controle da métrica
    value: MRR bridge reconciliado
  - label: Histórico
    value: Snapshot SCD Type 2
limitations:
  - Fixtures sintéticas e DuckDB local; não é um sistema de billing em produção.
---

## A decisão

Finance e Produto precisam responder da mesma forma a perguntas aparentemente simples: quanto de receita recorrente encerrou o mês, o que mudou esse saldo e quantos clientes permaneceram ativos. Quando MRR, net revenue retention e retenção de cohort usam populações diferentes, toda decisão posterior vira uma discussão sobre definições.

Construí este projeto como produto analítico compacto, não como uma coleção de SQLs. Ele transforma fixtures versionadas de assinaturas, invoices, clientes e eventos em marts reconciliados, métricas documentadas, testes e um dashboard que lê apenas dessas camadas confiáveis.

## Contexto

Métricas de assinatura misturam saldos, movimentos e populações. MRR final é saldo e não deve ser somado entre meses. New, expansion, contraction, churn e reactivation são movimentos que precisam reconciliar abertura e fechamento. NRR pode ficar acima de 100% quando expansão compensa perdas, mesmo com queda na retenção de clientes.

Eventos atrasados criam outro risco. Reprocessar tudo é caro, mas usar apenas timestamps maiores que o máximo anterior perde eventos que chegaram tarde. Atributos de clientes também mudam; guardar somente a linha atual apaga o contexto histórico.

## Meu papel

Defini contratos de métricas, organizei source, staging, intermediate e marts, implementei movimentos e snapshot de clientes e adicionei testes para invariantes de negócio. Também criei um dashboard Streamlit que consome os marts em vez de duplicar lógica na visualização.

O repositório roda com dbt e DuckDB sem credenciais de cloud. Fixtures versionadas permitem revisar falhas no CI e repetir a execução em clone limpo.

## Restrições

O resultado precisa ser idêntico localmente e no GitHub Actions. Embora pequenos e sintéticos, os dados devem demonstrar padrões transferíveis: staging tipado, chaves estáveis, grãos explícitos, lookback incremental, slowly changing dimensions e reconciliação.

O dashboard comprova consumo; não substitui a documentação do dbt. DuckDB valida comportamento, não custo, concorrência ou performance de um warehouse real.

## Abordagem

Staging renomeia e tipa campos preservando o significado de origem. Intermediate constrói períodos de assinatura, atividade e movimentos mensais. Marts expõem fatos de assinatura, eventos, MRR bridge, cohort retention, churn e revenue retention.

O modelo de eventos é incremental com lookback para reconsiderar chegadas tardias. Um snapshot mantém histórico de clientes como SCD Type 2. Testes cobrem unicidade, nulos, valores aceitos, relacionamentos e regras como a reconciliação dos movimentos de MRR.

O app lê os marts do DuckDB e diferencia saldo, movimento e taxa. Não existe uma segunda implementação da métrica em Python.

## Decisões de projeto

Modelei movimentos explicitamente em vez de inferi-los no gráfico. Assim cada customer-month recebe uma classificação auditável. Fixei o denominador de cada cohort no mês de entrada; ele não diminui quando clientes saem. Para late-arriving events, escolhi lookback limitado: full refresh é simples e caro; corte estrito é eficiente e incorreto.

## Evidências

O build em ambiente limpo termina com 76 nós dbt aprovados, incluindo modelos, seeds, snapshots e testes. O MRR bridge reconcilia movimentos com a variação do saldo. O snapshot preserva histórico, e a documentação expõe lineage, colunas e testes.

O dashboard mostra MRR final, NRR, receita paga, cohort retention e a ponte de movimentos. Os valores vêm de fixtures sintéticas identificadas como tal e demonstram consumo dos marts sem transferir regra de negócio para a interface.

## O bug do denominador

Uma versão anterior contava apenas os clientes ainda visíveis em cada mês de atividade. O denominador caía junto com o numerador e fazia a retenção tardia parecer melhor. A query era válida e o gráfico plausível — justamente por isso o erro era perigoso.

Corrigi o modelo materializando o tamanho original do cohort e ligando todos os períodos a esse denominador fixo. Um teste semântico protege o comportamento esperado. O episódio mostra por que um dashboard bonito ainda pode estar errado quando o contrato populacional é implícito.

## Limitações

Os dados são sintéticos e cobrem poucos meses. Câmbio usa fixture; impostos, refunds, créditos e alterações contratuais são simplificados. O engine local não demonstra permissões, custo ou orquestração de warehouse. NRR acima de 100% não representa crescimento de uma empresa real.

## Próximo passo

Em produção, eu mapearia os contratos ao billing real, alinharia cutoffs com Finance, adicionaria freshness e anomalias e validaria backfills contra fechamentos aprovados. Estratégia incremental específica do warehouse e controle de acesso viriam depois da reconciliação.

## Links

O repositório contém SQL, testes, fixtures, documentação e CI. A demo é uma camada de apresentação sobre marts testados.
