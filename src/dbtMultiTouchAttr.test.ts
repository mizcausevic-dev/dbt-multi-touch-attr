import { describe, expect, it } from "vitest";

import { journeyCredit, modelLane, payload, summary } from "./services/attributionService";

describe("dbt-multi-touch-attr", () => {
  it("summary exposes attribution posture", () => {
    const result = summary();

    expect(result.touchCount).toBeGreaterThan(0);
    expect(result.pipelineCreditUsd).toBeGreaterThan(0);
    expect(result.recommendation).toContain("SQL");
  });

  it("model lane and journey credit stay commercially legible", () => {
    expect(modelLane().length).toBeGreaterThan(1);
    expect(journeyCredit().some((row) => row.rationale.includes("journey"))).toBe(true);
  });

  it("payload bundles the full modeled surface", () => {
    const result = payload();

    expect(result.dashboard.touchCount).toBe(result.journeys.length);
    expect(result.modelLane.length).toBeGreaterThan(0);
    expect(result.credit.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
