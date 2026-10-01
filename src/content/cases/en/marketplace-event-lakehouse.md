---
locale: en
slug: marketplace-event-lakehouse
order: 3
title: Marketplace Event Lakehouse
eyebrow: Data Engineering
description: A replay-safe event lakehouse that turns duplicated, late and out-of-order marketplace events into reconciled funnel and revenue models.
role: Event pipeline · data quality · Gold models
year: 2026
dataKind: generated
dataLabel: Deterministic generated events
question: How do duplicated, late and out-of-order events become trustworthy funnel, GMV and revenue metrics?
repoUrl: https://github.com/J0BS013/marketplace-event-lakehouse
socialImage: /social/marketplace-event-lakehouse.png
sourceCommit: 7b5a7e037408911d5ee15fdc49b015041a21f50c
evidence:
  - label: Reliability
    value: Replay-safe MERGE
  - label: Data quality
    value: Quarantine + reconciliation
  - label: Performance
    value: Versioned 100k benchmark
scope:
  - Deterministic local workload with a versioned 100k-event benchmark.
---

## What this project is

Marketplace Event Lakehouse is a Dockerized PySpark, Delta Lake and Prefect pipeline for marketplace behavioral events. It ingests noisy event batches, preserves raw evidence, quarantines invalid records and produces replay-safe orders, revenue and sequence-aware funnel models.

A marketplace operator needs to know where buyers abandon a journey, how much gross merchandise value was created and how much revenue can be recognized. Those decisions are only defensible if the pipeline handles duplicates, delayed delivery and impossible sequences without quietly changing prior results.

I built this lakehouse to make reliability visible. The goal is not to show three folders named Bronze, Silver and Gold. It is to prove that reprocessing the same input does not duplicate facts, that rejected rows are explainable, and that a funnel respects the order in which a real journey could occur.

## Why event data is difficult

Event streams contain two clocks. Event time describes when the user acted; ingestion time describes when the platform received the record. A delayed checkout can arrive after a later batch. A retry can create the same event twice. Seller or product attributes can change after an order and still need to be reconstructed historically.

Naive counts make these problems look like business behavior. Duplicate purchases inflate gross merchandise value. Joining current dimension values rewrites history. Counting each event independently can produce more checkouts than carts, a result that is mathematically possible in SQL but impossible for the journey definition.

## What I built

I designed the deterministic event generator, PySpark transformations, Delta Lake tables, Prefect orchestration and business-ready Gold models. I specified data-quality rules, quarantine behavior, run metadata, service-level alerts and a benchmark artifact that can be inspected without rerunning the largest scenario.

I also wrote the tests and runbook around recovery. The core design question was how to make the pipeline safe to retry, because retries are normal operating behavior rather than an exceptional edge case.

## Design requirements

The repository runs locally in Docker, so it must balance a production-style architecture with a workload that a reviewer can execute. Events are generated rather than captured from a real marketplace. Performance numbers describe the documented local environment, not a managed Spark cluster.

The pipeline must preserve raw evidence, isolate invalid records, support backfill and avoid side effects from reruns. Business models must reconcile with accepted Silver events rather than with the noisier Bronze input.

## How the lakehouse works

Bronze stores immutable events with payload, event time, ingestion time and run metadata. Silver validates schemas, normalizes fields, deduplicates event identifiers, applies watermark rules and sends malformed or unacceptably late rows to quarantine. Delta `MERGE` operations make accepted writes idempotent.

Seller and product dimensions use slowly changing dimension Type 2 intervals so a fact can resolve the version valid at event time. Sessionization groups behavior into bounded journeys. Gold produces orders, daily revenue and a cumulative funnel in which each step requires the preceding step within the same valid sequence.

Prefect coordinates the stages and records row counts, rejected rows, duplicates, late events, freshness and service-level alerts. The runbook describes retries, backfills and common failure modes.

## Design decisions

I retained both clocks instead of replacing event time with ingestion time. Event time supports behavioral truth; ingestion time supports operational diagnosis. The watermark is a policy with explicit quarantine, not a silent filter.

I chose immutable Bronze plus idempotent Silver merges. Overwriting raw input would make debugging easier in the short term but remove evidence needed to explain why a record was rejected or changed.

For funnel construction, I rejected independent daily event counts. The Gold model evaluates ordered milestones inside a session, so a checkout contributes only when a qualifying cart exists before it. This is stricter than counting event types, but it matches the decision the funnel is meant to support.

## Results and validation

The smoke run reports rows read and written at every layer, duplicate and late-row counts, rejected records, dimension versions and Gold model sizes. Revenue models reconcile paid order facts. Replaying the same input preserves output cardinality because stable event keys drive Delta merges.

The repository includes a versioned 100,000-event benchmark with environment and timing metadata. It is useful for regression detection, not as a claim of cloud-scale performance. Automated tests cover idempotency, quarantine, Type 2 intervals, sequence-aware funnels and revenue reconciliation.

## When checkout exceeded cart

An early funnel grouped events by day and counted each type independently. Because events could arrive late or belong to different sessions, the output sometimes showed more checkouts than carts. The aggregation was doing exactly what it was written to do, but the metric did not represent a journey.

I replaced the independent counts with cumulative, sequence-aware milestones. A session must contain each prerequisite before the next stage can qualify. A regression test asserts the ordering invariant. The correction changed both the SQL logic and the meaning documented for consumers.

## How to interpret the benchmark

The event generator is deterministic and does not reproduce every production failure mode. The local Docker benchmark cannot establish autoscaling, cloud storage throughput or multi-tenant concurrency. Identity stitching is simplified, and the session boundary is a chosen business rule rather than a universal truth.

The project demonstrates operational patterns but does not include streaming infrastructure, a schema registry, enterprise secrets management or a complete observability platform.

## Production boundary

A production rollout requires validating event contracts with producers, publishing schema-compatibility rules and replaying a representative historical partition alongside the current warehouse. Cost and latency budgets, quarantine monitoring and ownership for each service-level agreement belong to that operating model before continuous processing.

## Explore the project

The repository contains the Docker environment, generated workload, orchestration, tests, benchmark and runbook. The architecture diagram above corresponds to the implemented layers and source commit.
