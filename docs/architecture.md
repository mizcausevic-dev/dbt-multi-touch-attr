# Architecture

## Core idea

`dbt-multi-touch-attr` models attribution as a warehouse contract:
- raw marketing touches are normalized
- journey windows are constructed in SQL
- model logic assigns revenue credit
- the resulting outputs remain inspectable by Growth, RevOps, and finance

## Surface model

- overview
  - touch volume, opportunity count, channel count, model count, and revenue-credit posture
- model lane
  - staging, intermediate, and mart transformation flow
- journey credit
  - raw journey touches alongside final credit outputs
- verification
  - claims about model governance and auditability

## Data model

- `JourneyTouch`
  - account
  - opportunity
  - channel
  - day offset
  - session quality
  - conversion value
- `CreditRow`
  - model
  - channel
  - credit percentage
  - revenue credit
  - rationale
- `ModelStep`
  - dbt layer
  - artifact
  - purpose

## SQL layout

- `models/staging/stg_marketing_touches.sql`
  - source cleanup and normalization
- `models/intermediate/int_journey_windows.sql`
  - ordering and windowing of touches
- `models/marts/fct_multi_touch_credit.sql`
  - final revenue-credit fact table
- `models/schema.yml`
  - tests and model documentation

## Commercial value

The point is not to declare one attribution model as universally correct. The point is to make the transformation and credit logic visible enough that budget, forecasting, and channel decisions can be challenged intelligently.
