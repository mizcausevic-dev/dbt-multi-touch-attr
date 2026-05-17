import { creditRows, journeyTouches, modelSteps } from "../data/sampleAttribution";

export function summary() {
  const pipelineCreditUsd = Math.round(creditRows.reduce((total, row) => total + row.revenueCreditUsd, 0));
  const opportunityCount = new Set(creditRows.map((row) => row.opportunityId)).size;
  const channelCount = new Set(journeyTouches.map((touch) => touch.channel)).size;
  const modelCount = new Set(creditRows.map((row) => row.model)).size;

  return {
    touchCount: journeyTouches.length,
    opportunityCount,
    channelCount,
    modelCount,
    pipelineCreditUsd,
    recommendation:
      "Keep attribution logic in reviewable SQL so Growth and RevOps can compare model outcomes before they turn channel spend into false certainty."
  };
}

export function modelLane() {
  return modelSteps;
}

export function journeyCredit() {
  return creditRows;
}

export function journeys() {
  return journeyTouches;
}

export function verification() {
  return [
    "Journey touches stay inspectable before credit is assigned, which keeps attribution debates tied to real rows instead of dashboard mythology.",
    "Model lane surfaces where first-touch, last-touch, linear, and U-shaped logic diverge.",
    "Revenue credit is exposed in machine-readable form so analysts can audit why channels gained or lost influence."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    modelLane: modelLane(),
    journeys: journeys(),
    credit: journeyCredit(),
    verification: verification()
  };
}
