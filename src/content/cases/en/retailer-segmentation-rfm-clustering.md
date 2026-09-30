---
locale: en
slug: retailer-segmentation-rfm-clustering
order: 5
title: Retailer RFM Decisioning
eyebrow: Customer Analytics
description: A reproducible segmentation pipeline that turns RFM behavior into cost-aware campaign actions, validated against clustering and exposed through trusted analytical outputs.
role: Analytics engineer and decision analyst
year: 2026
dataKind: public
dataLabel: UCI Online Retail II
question: Which customers deserve retention investment, and when is not targeting the better decision?
repoUrl: https://github.com/J0BS013/retailer-segmentation-rfm-clustering
image: /images/projects/retailer-segmentation-rfm-clustering.png
socialImage: /social/retailer-segmentation-rfm-clustering.png
imageAlt: Customer and revenue share across Champions, Loyal, At Risk, Lost and New RFM segments.
sourceCommit: 4374d4e31555ebf3734a301da98da333de9ced81
evidence:
  - label: Customers
    value: "5,878"
  - label: Transactions
    value: "1.04M"
  - label: Revenue in Champions
    value: "68.2%"
  - label: K-means silhouette
    value: "0.61"
limitations:
  - Campaign economics are explicit scenario assumptions, not measured incremental response.
---

## The decision

Segmentation matters only when it changes an action. This project asks which customers should receive retention, loyalty or reactivation investment—and which should receive no paid contact because expected value does not justify the cost.

The output combines an interpretable RFM policy with a campaign decision layer. Every customer receives a segment, a recommended action or `do_not_target`, and an expected net value under visible assumptions.

## From transactions to customer behavior

The public Online Retail II dataset contains 1,041,670 transactions from December 2009 through December 2011. The pipeline cleans transaction semantics, resolves identified customers and produces Recency, Frequency and Monetary features for 5,878 customers.

RFM quintiles create deterministic, explainable segments. K-means on transformed features is used as a validation lens rather than as an opaque replacement. Five clusters produced a local silhouette peak of 0.61 and broadly supported the behavioral structure.

## Evidence

Champions are only 22.0% of customers but account for 68.2% of revenue. They average £9,361.66 in spend, 17.1 orders and only 18.7 days since their last purchase. Loyal Customers represent 24.0% of customers and 15.5% of revenue.

The At Risk group is strategically different: 14.0% of customers, 9.2% of revenue and £1,983.10 average spend, but 368.1 days since the last purchase. Lost customers are the largest group at 32.5%, yet contribute only 4.9% of revenue and average 1.3 orders.

That concentration makes blanket campaigns wasteful. High-value inactivity deserves a different intervention from low-value one-time behavior.

## Decision layer

The campaign policy combines baseline response, incremental conversion, margin, contact cost and incentive cost. These are scenario inputs stored explicitly, not claims inferred from the dataset. A customer is targeted only when the selected action has positive expected net value; otherwise the output is `do_not_target`.

This makes the economic trade-off reviewable. Teams can change assumptions, compare policies and see which decisions change instead of hiding business logic inside a cluster label.

## What I rejected

I rejected treating k-means labels as the final business answer. Cluster numbers have no stable meaning and do not explain an intervention by themselves. The deterministic RFM policy remains the operational layer because it is auditable; clustering tests whether the chosen structure is plausible.

I also rejected targeting every Lost customer. Their size looks attractive, but low order frequency and low revenue share make broad win-back spending difficult to justify. Only the higher-value portion should qualify under positive economics.

## Engineering quality

Pandera validates data contracts, Parquet preserves typed intermediate outputs and DuckDB supports analytical inspection. Automated tests, Docker and CI make the full pipeline reproducible. A versioned metrics artifact connects README claims and portfolio evidence to the same generated results.

## Limitations and next test

RFM describes past behavior; it does not estimate incremental response or customer lifetime value. Campaign assumptions must be calibrated with a randomized holdout. The next step is a segment-stratified experiment measuring incremental contribution margin, with contact pressure and opt-out rates as guardrails.
