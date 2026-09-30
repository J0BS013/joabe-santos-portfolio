---
locale: en
slug: thin-file-credit-decision-engine
order: 1
title: Thin-File Credit Decision Engine
eyebrow: Decision Science
description: A synthetic, end-to-end credit policy case connecting point-in-time features, calibrated risk, take-up and expected value.
role: Decision scientist and builder
year: 2026
dataKind: synthetic
dataLabel: Synthetic applicants
question: Who should be approved, at what first-loan size, and when is extra verification worth the friction?
repoUrl: https://github.com/J0BS013/thin-file-credit-decision-engine
demoUrl: https://thin-file-credit-decision.streamlit.app/
image: /images/projects/thin-file-credit-decision-engine.png
imageAlt: Credit decision simulator showing a policy recommendation, risk estimates and decision-time inputs.
sourceCommit: 96806600894d401e71f0d572d6863ac7bcf29535
evidence:
  - label: Validation design
    value: Out-of-time
  - label: Policy objective
    value: Expected value
  - label: Decisions
    value: Approve · verify · decline
limitations:
  - Synthetic portfolio; no claim of real lending performance.
---

## The decision

A probability score is not a lending decision. The operational question is which applicant to approve, how much to offer on the first loan, and whether asking for more evidence is worth the conversion loss. Those choices interact: a conservative threshold reduces defaults but can reject profitable customers, while a high limit can turn an otherwise acceptable borrower into a negative-value decision.

I built this project to make that policy layer visible. The output is not simply “risk = 12%.” It is an approve, verify or decline recommendation, a proposed amount, an expected value and a reason that can be inspected. The entire portfolio is synthetic, so the project demonstrates methodology and engineering discipline rather than real underwriting performance.

## Context

Thin-file applicants have limited traditional credit history. A missing bureau score can mean a young but viable borrower, not automatically a bad one. At the same time, missing information raises uncertainty and can increase fraud or default exposure. Treating every missing value as zero would silently encode a rejection rule. Treating it as harmless would understate risk.

The problem also includes demand. Even a low-risk offer creates no value if the customer is unlikely to accept it. The engine therefore estimates default risk, fraud risk and take-up separately, then combines those estimates with revenue, loss and verification assumptions. This keeps prediction and policy distinct.

## My role

I designed the synthetic data-generating process, the point-in-time feature layer, the temporal validation, the three probability models and the decision policy. I also built the Streamlit interface so a reviewer can inspect one application, see the decision-time inputs and understand why the policy selected a particular action.

The repository includes reproducible commands, automated tests, model and policy artifacts, and documentation of the synthetic assumptions. My focus was the path from imperfect evidence to an auditable recommendation, not the pursuit of a single impressive model metric.

## Constraints

The data must imitate the timing of a real decision. Features available after an application cannot leak into training or scoring. The evaluation period must occur after the training period. Missing bureau information must be represented explicitly. Finally, the policy must remain understandable enough to review without reverse-engineering model internals.

There is no protected-class fairness claim, production identity verification or regulatory compliance layer. Those are material requirements for a real credit system and are documented as limitations rather than implied by a polished interface.

## Approach

The pipeline creates synthetic applications, bureau observations, cash-flow signals, document requirements and eventual outcomes. Feature generation uses only information available at each decision timestamp. Models estimate default, fraud and take-up probabilities. Calibration is checked because policy value depends on probability quality, not only ranking.

For every candidate amount, the policy calculates expected value from the probability of acceptance, expected revenue, expected credit loss, fraud exposure and verification cost. It then chooses the best positive-value action under explicit risk limits. A challenger policy can be compared with the champion on the same out-of-time population.

> Model scores describe uncertainty. Policy turns that uncertainty into an action under economic and risk constraints.

## Key decisions

I kept the three prediction tasks separate. Combining fraud and default into one target would simplify the interface, but it would hide different interventions: a verification step can reduce fraud exposure without changing a borrower’s underlying repayment risk. Take-up also remains separate because it represents customer response rather than loss.

I chose temporal validation instead of a random train/test split. Random splitting can place near-identical market conditions on both sides and overstate how the policy travels forward in time. The out-of-time window is a harder but more honest approximation.

First-loan sizing is evaluated as part of the policy instead of being a fixed multiplier after approval. This allows a smaller offer to remain profitable when the requested amount would not.

## Evidence

The application produces reproducible model metrics, calibration diagnostics, policy summaries and champion/challenger comparisons. The live simulator exposes predicted default, fraud and take-up, expected value, recommended amount, verification requirement and the decision reason for each synthetic application.

Automated tests cover point-in-time constraints, feature behavior, policy invariants and reproducibility. The interface includes a prominent synthetic-data notice. That disclosure is part of the evidence: it prevents simulated economics from being mistaken for observed business impact.

## Why a high score was not enough

An early framing treated the default score as the product: select a threshold and approve everything below it. That path was rejected because it ignored take-up, amount and the cost of verification. It could also approve negative-value applications merely because their default probability was below an arbitrary cutoff.

The correction was to optimize over actions rather than labels. Each action now has its own economics and constraints. A “verify” decision is selected only when the expected information benefit can justify the added friction. A decline can result from non-positive expected value even when no individual risk score is extreme.

## Limitations

All applicants and outcomes are synthetic. The model does not establish real-world discrimination, profitability or stability. It does not include macroeconomic shocks, bureau-vendor outages, adversarial fraud adaptation, collections behavior or a complete fairness assessment. The economic parameters are scenario inputs, not accounting forecasts.

The simulator explains policy inputs and reason codes, but it is not a legally sufficient adverse-action system. A production implementation would require governance, monitoring, access controls, human-review rules and local regulatory review.

## Next step

The next meaningful step would be a shadow-mode evaluation on consented, governed historical data. I would define approval, loss, fairness and take-up monitoring before changing any live policy, then compare champion and challenger under identical decision windows. Drift alerts and override analysis would be part of the launch criteria, not added after deployment.

## Links

The repository contains the full pipeline, tests and methodology. The live demo is an interactive review surface for the synthetic policy; it does not assess real applicants.
