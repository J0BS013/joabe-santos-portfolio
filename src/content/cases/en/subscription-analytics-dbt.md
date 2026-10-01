---
locale: en
slug: subscription-analytics-dbt
order: 2
title: Subscription Analytics with dbt
eyebrow: Analytics Engineering
description: A dbt and DuckDB analytics product that delivers reconciled MRR, NRR, churn and cohort metrics through tested marts and an interactive dashboard.
role: Metric contracts · dbt models · dashboard
year: 2026
dataKind: synthetic
dataLabel: Versioned synthetic fixtures
question: Can Finance and Product trust MRR, NRR, churn and retention when source data changes and events arrive late?
repoUrl: https://github.com/J0BS013/subscription-analytics-dbt
demoUrl: https://subscription-analytics-dbt.streamlit.app/
image: /images/projects/subscription-analytics-dbt.png
socialImage: /social/subscription-analytics-dbt.png
imageAlt: Subscription analytics dashboard with ending MRR, NRR, paid revenue and a monthly MRR movement bridge.
sourceCommit: 40f74e571639a4aee525c5bbaf928ba9d7271d3a
evidence:
  - label: Build validation
    value: 76 passing nodes
  - label: Metric control
    value: Reconciled MRR bridge
  - label: History
    value: SCD Type 2 snapshot
scope:
  - Versioned synthetic subscription fixtures executed locally in DuckDB.
---

## What this project is

Subscription Analytics with dbt is a self-contained analytics product for recurring-revenue reporting. It converts versioned subscription, invoice, customer and product-event data into tested marts for MRR, NRR, churn, paid revenue and cohort retention, then serves those marts through dbt documentation and an interactive dashboard.

Finance and Product need the same answer to apparently simple questions: how much recurring revenue ended the month, what changed it, and how many customers remained active. If MRR, NRR and cohort retention use inconsistent populations, every downstream decision becomes a debate about definitions.

I built this project as a compact analytics product rather than a collection of SQL files. Its job is to turn versioned subscription, invoice, customer and event fixtures into reconciled marts, documented metrics, automated quality checks and a dashboard that reads only from those marts.

## Why subscription metrics break

Subscription metrics mix balances, movements and populations. Ending MRR is a balance and must not be summed across months. New, expansion, contraction, churn and reactivation are movements and must reconcile from one month’s balance to the next. NRR can exceed 100% when expansion offsets contraction and churn, even when customer retention falls.

Late-arriving product events create another problem. Rebuilding every event on every run is wasteful, but a naive incremental boundary can permanently miss records that arrive after their event timestamp. Customer attributes also change over time, so using only the latest customer row destroys the historical context of prior months.

## What I built

I defined the metric contracts, organized source, staging, intermediate and mart layers, implemented the movement logic and customer snapshot, and added tests that express business invariants. I also created a Streamlit dashboard that consumes the trusted marts rather than duplicating metric logic in the presentation layer.

The repository is intentionally reproducible with dbt and DuckDB. Versioned fixtures make failures reviewable in continuous integration without cloud credentials or access to a private warehouse.

## Design requirements

The project has to run from a clean clone and produce the same result locally and in GitHub Actions. Source fixtures are synthetic and small, but the models should express patterns that transfer to a warehouse: typed staging, stable keys, explicit grains, incremental lookback, slowly changing dimensions and reconciliation tests.

The dashboard is evidence of consumption, not a replacement for dbt documentation. DuckDB demonstrates the model behavior but does not establish warehouse-specific cost, concurrency or performance.

## How the data product works

Staging models rename and type raw fields while preserving source meaning. Intermediate models construct subscription periods, customer activity and monthly MRR movements. Marts expose subscription facts, product events, the MRR bridge, cohort retention, churn and revenue retention.

The event model is incremental with a lookback window so late records can be reconsidered. A dbt snapshot maintains customer history using slowly changing dimension Type 2 semantics. Tests cover uniqueness, not-null expectations, accepted values, relationships and custom business assertions such as MRR movement reconciliation.

The Streamlit app reads the resulting DuckDB marts and explains whether a value is a balance, a movement or a cohort rate. It adds no second implementation of MRR.

## Metric design decisions

The first decision was to model MRR movements explicitly instead of inferring them in a chart. That produces one auditable bridge where every customer-month is classified as new, expansion, contraction, churn or reactivation.

The second was to use a fixed cohort denominator. A cohort’s size is established at entry and does not shrink when customers churn. This makes retention comparable over time and prevents survivors from redefining the population.

The third was to give late events a bounded lookback. A full rebuild is simple but scales poorly; a strict “greater than maximum timestamp” rule is efficient but wrong for delayed arrivals. The lookback is an explicit trade-off between correctness and compute.

## Results and validation

The clean-environment build completes with 76 passing dbt nodes, including models, seeds, snapshots and tests. The MRR bridge reconciles movements to the difference between opening and closing balances. Snapshot execution preserves customer history. Documentation exposes model lineage, columns and tests.

The dashboard shows ending MRR, net revenue retention, paid revenue, cohort retention and the movement bridge. Its figures are based on synthetic fixtures and are labeled as such. They demonstrate that the marts can support a business-facing surface without moving metric logic into Python.

## The denominator bug

An earlier cohort calculation counted only customers still visible in each activity month. That denominator declined together with the numerator, making later retention look better than it was. The query was technically valid and visually plausible, which made it dangerous.

I corrected the model by materializing the original cohort size and joining every period back to that fixed denominator. A semantic test now checks the expected cohort behavior. This episode is central to the case because it shows why a dashboard can be polished and still be wrong when the population contract is implicit.

## How to interpret the metrics

The source data is synthetic and covers a limited time horizon. Currency conversion uses fixture rates rather than a governed finance source. Taxes, refunds, credits, invoice amendments and complex contract modifications are simplified. The local engine does not demonstrate production orchestration, warehouse permissions or cost controls.

NRR above 100% in the fixture is not evidence of a real company’s growth. It demonstrates the metric relationship between expansion, contraction and churn.

## Production boundary

Production adoption requires mapping these contracts to the billing system’s event model, agreeing on accounting cutoffs with Finance, adding source-freshness and anomaly thresholds, and validating backfills against signed-off monthly statements. Warehouse-specific incremental strategies and role-based access follow that reconciliation.

## Explore the project

The repository contains SQL, tests, fixtures, dbt documentation and CI. The live dashboard is a presentation layer over the tested marts.
