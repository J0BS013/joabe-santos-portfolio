---
locale: en
slug: hevy-workout-etl-pipeline
order: 6
title: Hevy Workout ETL
eyebrow: Data Product
description: A resilient API-to-dashboard data product that protects historical workout data, promotes trusted Medallion outputs and surfaces progression through an interactive app.
role: API ingestion · Medallion models · dashboard
year: 2026
dataKind: generated
dataLabel: Versioned personal workout snapshot
question: How can an API-backed personal dataset remain complete, reproducible and useful when extraction fails halfway?
repoUrl: https://github.com/J0BS013/hevy-workout-etl-pipeline
demoUrl: https://hevy-workout-dashboard-j0bs013.streamlit.app/
image: /images/projects/hevy-workout-etl-pipeline.png
socialImage: /social/hevy-workout-etl-pipeline.png
imageAlt: Hevy Workout Analytics dashboard with workout frequency, volume, progression and consistency views.
sourceCommit: 5618eb64288cc15af1accc0203d7cdd1955783ce
evidence:
  - label: Versioned workouts
    value: "510"
  - label: Historical span
    value: "2023–2026"
  - label: Analytical models
    value: "99 exercises"
  - label: Automated tests
    value: "56"
scope:
  - Versioned personal snapshot; the public app requires no private API access.
---

## What this project is

The project turns workout history from the Hevy API into a durable analytical product. It is both an ETL system and something tangible to use: a four-tab Streamlit dashboard for frequency, training volume, exercise progression and statistical consistency.

The public app reads committed Gold and Analytics outputs. It never needs the private API credential, which keeps deployment safe and makes the demo reproducible.

## The reliability problem

Paginated APIs can fail after several successful pages. Saving that partial response as a new snapshot would silently erase history and produce convincing but wrong charts. The extraction therefore returns success only after every page completes.

Each required page has a 15-second timeout. Only rate limits, server errors and timeouts are retried with exponential backoff; authentication and other non-recoverable errors fail immediately. New Parquet files are promoted atomically, so a failed write preserves the previous trusted snapshot.

## Data architecture

Bronze preserves the raw API-shaped history. Silver standardizes types, validates keys and rejects invalid records. Gold produces workout, exercise and muscle-group facts at documented grains. The Analytics layer derives weekly volume, personal records, exercise trends and consistency measures.

The dashboard consumes only Gold and Analytics. This boundary keeps presentation logic out of ingestion and lets tests verify the same tables the user sees.

## Results and validation

The published snapshot contains 510 workouts from October 2023 through March 2026 and 4.33 million kilograms of recorded training volume. The analytical layer evaluates 99 exercise histories; 49 show a statistically significant time trend under the defined OLS rule.

The UI exposes Overview, Volume, Progression and Analytics tabs. Filters change the review window without changing the source snapshot. Fifty-six automated tests cover API behavior, transformations, data quality and analytics without calling the live service.

## Statistical layer

Progression is estimated per exercise with ordinary least squares over time. Each output includes slope, R², p-value and a significance flag at p < 0.05. Weekly volume trend, personal records and coefficient-of-variation consistency provide complementary views instead of collapsing progress into one score.

These statistics describe the recorded history. They do not prove that a training program caused a change or that every significant slope is practically meaningful.

## Design choice

I rejected an app that queried the API on every page load. It would couple availability to a third party, risk leaking credentials and make the displayed result change without a versioned data boundary. I also rejected CSV as the pipeline contract because it loses types that matter across layers.

The chosen design makes freshness explicit. A green repository means the tested code and versioned snapshot are healthy; it does not imply that the public app continuously ingests new private workouts.

## How to interpret the dashboard

The dashboard describes one versioned training history; it is an analytical product, not a fitness recommendation. OLS does not attribute changes to a program and may reflect injuries or exercise substitutions. Private scheduled ingestion can refresh the snapshot while deployment continues to publish only anonymized aggregates, keeping raw workouts and credentials outside the public app.
