---
locale: pt-br
slug: subscription-analytics-dbt
order: 2
title: Análise de Assinaturas com dbt
eyebrow: Analytics Engineering
description: Um produto analítico com dbt e DuckDB que entrega métricas reconciliadas de MRR, NRR, churn e retenção por meio de modelos testados e um painel interativo.
role: Contratos de métricas · modelos dbt · painel
year: 2026
dataKind: synthetic
dataLabel: Dados sintéticos versionados
question: Finance e Produto podem confiar em MRR, NRR, churn e retenção quando os dados mudam e chegam atrasados?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
socialImage: /social/subscription-analytics-dbt.png
imageAlt: Painel de assinaturas com MRR final, NRR, receita paga e ponte mensal de movimentos de MRR.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Validação do build
    value: 76 nós aprovados
  - label: Controle da métrica
    value: MRR bridge reconciliado
  - label: Histórico
    value: Snapshot SCD Type 2
scope:
  - Dados sintéticos versionados executados localmente no DuckDB.
---

## O que é este projeto

A Análise de Assinaturas com dbt é um produto analítico completo para receita recorrente. Ele transforma dados versionados de assinaturas, faturas, clientes e eventos em modelos testados de MRR, NRR, churn, receita paga e retenção por coorte, consumidos pela documentação do dbt e por um painel interativo.

Finance e Produto precisam responder da mesma forma a perguntas aparentemente simples: quanto de receita recorrente encerrou o mês, o que mudou esse saldo e quantos clientes permaneceram ativos. Quando MRR, NRR e retenção de cohort usam populações diferentes, toda decisão posterior vira uma discussão sobre definições.

Construí este projeto como um produto analítico compacto, não como uma coleção de arquivos SQL. Ele transforma dados versionados de assinaturas, faturas, clientes e eventos em modelos reconciliados, métricas documentadas, testes e um painel que lê somente dessas camadas confiáveis.

## Por que métricas de assinatura quebram

Métricas de assinatura misturam saldos, movimentos e populações. MRR final é saldo e não deve ser somado entre meses. New, expansion, contraction, churn e reactivation são movimentos que precisam reconciliar abertura e fechamento. NRR pode ficar acima de 100% quando expansão compensa perdas, mesmo com queda na retenção de clientes.

Eventos atrasados criam outro risco. Reprocessar tudo é caro, mas usar apenas timestamps maiores que o máximo anterior perde eventos que chegaram tarde. Atributos de clientes também mudam; guardar somente a linha atual apaga o contexto histórico.

## O que construí

Defini contratos de métricas, organizei as camadas de origem, preparação, transformação e consumo, implementei os movimentos de receita e o histórico de clientes e adicionei testes para regras de negócio. Também criei um painel em Streamlit que consome os modelos finais sem duplicar a lógica das métricas.

O repositório roda com dbt e DuckDB sem credenciais de nuvem. Os dados versionados permitem revisar falhas na integração contínua e repetir a execução a partir de um clone limpo.

## Requisitos de projeto

O resultado precisa ser idêntico localmente e no GitHub Actions. Embora pequenos e sintéticos, os dados devem demonstrar padrões transferíveis: staging tipado, chaves estáveis, grãos explícitos, lookback incremental, slowly changing dimensions e reconciliação.

O painel comprova o consumo dos dados; não substitui a documentação do dbt. O DuckDB valida o comportamento dos modelos, não o custo, a concorrência ou o desempenho de um data warehouse real.

## Como o produto de dados funciona

A camada de preparação renomeia e tipa os campos preservando o significado original. A camada intermediária constrói períodos de assinatura, atividade e movimentos mensais. Os modelos finais expõem assinaturas, eventos, a ponte de MRR, retenção por coorte, churn e retenção de receita.

O modelo de eventos é incremental e reconsidera uma janela recente para capturar chegadas tardias. Um snapshot mantém o histórico de clientes como SCD Tipo 2. Os testes cobrem unicidade, valores nulos, valores aceitos, relacionamentos e regras como a reconciliação dos movimentos de MRR.

O aplicativo lê os modelos finais do DuckDB e diferencia saldo, movimento e taxa. Não existe uma segunda implementação da métrica em Python.

## Decisões de métricas

Modelei movimentos explicitamente em vez de inferi-los no gráfico. Assim cada customer-month recebe uma classificação auditável. Fixei o denominador de cada cohort no mês de entrada; ele não diminui quando clientes saem. Para late-arriving events, escolhi lookback limitado: full refresh é simples e caro; corte estrito é eficiente e incorreto.

## Resultados e validação

A execução em ambiente limpo termina com 76 nós dbt aprovados, incluindo modelos, dados iniciais, snapshots e testes. A ponte de MRR reconcilia os movimentos com a variação do saldo. O snapshot preserva o histórico, e a documentação mostra a linhagem, as colunas e os testes.

O painel mostra MRR final, NRR, receita paga, retenção por coorte e a ponte de movimentos. Os valores vêm de dados sintéticos claramente identificados e demonstram o consumo dos modelos sem transferir regras de negócio para a interface.

## O bug do denominador

Uma versão anterior contava apenas os clientes ainda visíveis em cada mês de atividade. O denominador caía junto com o numerador e fazia a retenção tardia parecer melhor. A query era válida e o gráfico plausível — justamente por isso o erro era perigoso.

Corrigi o modelo materializando o tamanho original da coorte e ligando todos os períodos a esse denominador fixo. Um teste semântico protege o comportamento esperado. O episódio mostra por que um painel bonito ainda pode estar errado quando a população não foi definida explicitamente.

## Como interpretar as métricas

Os dados são sintéticos e cobrem poucos meses. O câmbio usa valores de teste; impostos, estornos, créditos e alterações contratuais são simplificados. O ambiente local não demonstra permissões, custos ou orquestração de um data warehouse. NRR acima de 100% não representa o crescimento de uma empresa real.

## Fronteira de produção

A adoção em produção exige mapear os contratos ao modelo de eventos do sistema de faturamento, alinhar datas de corte com Finanças, monitorar a atualização das fontes e definir limites para anomalias. Reprocessamentos históricos devem ser validados contra fechamentos aprovados antes de escolher estratégias incrementais específicas do data warehouse e controles de acesso.

## Explore o projeto

O repositório contém SQL, testes, dados de exemplo, documentação e integração contínua. A demonstração apresenta os modelos analíticos testados.
