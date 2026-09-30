---
locale: en
slug: starbucks-promo-effectiveness-analysis
order: 4
title: Starbucks Promo Effectiveness
eyebrow: Decision Analytics
description: An observational promotion analysis that attributes repeated offers at exposure grain, quantifies economic signals and defines the experiment required for a causal decision.
role: Decision analyst and builder
year: 2026
dataKind: public
dataLabel: Simulated Starbucks behavior dataset
question: Which offer deserves the next controlled test, and what can the historical behavior actually prove?
repoUrl: https://github.com/J0BS013/starbucks-promo-effectiveness-analysis
image: /images/projects/starbucks-promo-effectiveness-analysis.png
socialImage: /social/starbucks-promo-effectiveness-analysis.png
imageAlt: Observed revenue and reward-cost comparison for discount, BOGO and informational Starbucks offers.
sourceCommit: 652ff04cc5c8787233b9addbe5ee433e127f03ae
evidence:
  - label: Valid customers
    value: "14,825"
  - label: Offer exposures
    value: "115,609"
  - label: Discount completion association
    value: "+84.6%"
  - label: Automated tests
    value: "22"
limitations:
  - Observational behavior with no randomized holdout; reported revenue is not incremental lift.
---

## The decision

The useful question was not simply which offer had the highest completion rate. It was which promotion should advance to a controlled test, under what economic guardrails, and how much confidence the historical event stream supports.

The recommendation is to prioritize discount offers as the next test, retain BOGO as a challenger with stricter economics, and avoid treating informational messages as conversion-generating promotions. This is a test prioritization decision, not a rollout claim.

## The attribution problem

Customers can receive the same offer more than once. Views, transactions and completions may overlap across active windows. A customer-level join would multiply outcomes and make a popular offer appear more effective simply because it was sent repeatedly.

I modeled one row per received offer, created a unique exposure identifier and assigned each downstream event to the most recent eligible exposure inside its validity window. Each event can be attributed only once. Missing offer duration fails the pipeline instead of silently creating an unlimited window.

## Evidence

After demographic quality checks, the analysis covers 14,825 customers, 115,609 offer exposures and 10 offers. Viewing was associated with completion increasing from 35.4% to 62.2%, but a view is post-exposure behavior and cannot be used as a randomized treatment.

Discount offers had the strongest observed completion association: +84.6% between the comparison groups. Under the documented reward-cost proxy, discounts produced approximately $87,670 in observed net revenue and an 89% reward-to-revenue ratio. BOGO showed a +33.9% completion association but approximately -$138,480 under the same proxy, with a -59% ratio.

Those numbers describe observed behavior and scenario economics. They do not estimate incremental causal value.

## Decision design

The decision memo translates the analysis into a test plan. Eligible customers should be randomly assigned before exposure, with intention-to-treat as the primary analysis. The primary metric is incremental contribution margin per eligible customer; completion, conversion, order value and take-up are secondary metrics.

Reward cost, contact frequency, unsubscribe behavior and adverse segment concentration act as guardrails. Scaling requires the lower confidence bound for incremental contribution margin to remain positive without breaching those limits.

## What I rejected

I rejected a simple viewed-versus-not-viewed causal story. Viewing happens after assignment and is affected by customer behavior, so it introduces selection. I also rejected total attributed revenue as ROI: historical revenue can help prioritize an experiment, but without a valid counterfactual it cannot measure lift.

A separate synthetic experiment module demonstrates balanced assignment, treatment-effect estimation and power planning. Simulated causal outputs are never mixed with the Starbucks observations.

## Engineering quality

The pipeline is reproducible from source events through exposure-grain outputs, figures and the decision memo. Twenty-two tests cover attribution invariants, economic calculations and causal helpers. The repository keeps analytical claims, assumptions and limitations adjacent to the outputs they qualify.

## Limitations and next test

There is no randomized holdout, reward cost is not a complete margin model, and segment differences may reflect customer composition. The next step is therefore the pre-registered discount experiment—not a full rollout—followed by balance checks, confidence intervals and guardrail monitoring at the planned sample size.
