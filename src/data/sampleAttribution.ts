export type Channel =
  | "organic-search"
  | "paid-search"
  | "linkedin-paid"
  | "email-nurture"
  | "direct"
  | "partner";

export type ModelType = "first-touch" | "last-touch" | "linear" | "u-shaped";

export interface JourneyTouch {
  id: string;
  account: string;
  opportunityId: string;
  channel: Channel;
  dayOffset: number;
  sessionQuality: number;
  conversionValueUsd: number;
}

export interface CreditRow {
  opportunityId: string;
  account: string;
  model: ModelType;
  channel: Channel;
  creditPct: number;
  revenueCreditUsd: number;
  rationale: string;
}

export interface ModelStep {
  id: string;
  layer: string;
  artifact: string;
  purpose: string;
}

export const journeyTouches: JourneyTouch[] = [
  {
    id: "TCH-1001",
    account: "Northstar Health",
    opportunityId: "OPP-201",
    channel: "organic-search",
    dayOffset: -42,
    sessionQuality: 82,
    conversionValueUsd: 28000
  },
  {
    id: "TCH-1002",
    account: "Northstar Health",
    opportunityId: "OPP-201",
    channel: "linkedin-paid",
    dayOffset: -17,
    sessionQuality: 64,
    conversionValueUsd: 28000
  },
  {
    id: "TCH-1003",
    account: "Northstar Health",
    opportunityId: "OPP-201",
    channel: "email-nurture",
    dayOffset: -3,
    sessionQuality: 90,
    conversionValueUsd: 28000
  },
  {
    id: "TCH-2001",
    account: "Meridian Cloud",
    opportunityId: "OPP-305",
    channel: "paid-search",
    dayOffset: -21,
    sessionQuality: 76,
    conversionValueUsd: 16000
  },
  {
    id: "TCH-2002",
    account: "Meridian Cloud",
    opportunityId: "OPP-305",
    channel: "direct",
    dayOffset: -8,
    sessionQuality: 71,
    conversionValueUsd: 16000
  },
  {
    id: "TCH-2003",
    account: "Meridian Cloud",
    opportunityId: "OPP-305",
    channel: "email-nurture",
    dayOffset: -2,
    sessionQuality: 86,
    conversionValueUsd: 16000
  },
  {
    id: "TCH-3001",
    account: "Helio Systems",
    opportunityId: "OPP-411",
    channel: "partner",
    dayOffset: -35,
    sessionQuality: 79,
    conversionValueUsd: 42000
  },
  {
    id: "TCH-3002",
    account: "Helio Systems",
    opportunityId: "OPP-411",
    channel: "organic-search",
    dayOffset: -12,
    sessionQuality: 74,
    conversionValueUsd: 42000
  },
  {
    id: "TCH-3003",
    account: "Helio Systems",
    opportunityId: "OPP-411",
    channel: "direct",
    dayOffset: -1,
    sessionQuality: 95,
    conversionValueUsd: 42000
  }
];

export const creditRows: CreditRow[] = [
  {
    opportunityId: "OPP-201",
    account: "Northstar Health",
    model: "u-shaped",
    channel: "organic-search",
    creditPct: 40,
    revenueCreditUsd: 11200,
    rationale: "Organic search opened the journey and proved durable intent."
  },
  {
    opportunityId: "OPP-201",
    account: "Northstar Health",
    model: "u-shaped",
    channel: "linkedin-paid",
    creditPct: 20,
    revenueCreditUsd: 5600,
    rationale: "Mid-journey paid influence accelerated re-engagement but did not close the deal."
  },
  {
    opportunityId: "OPP-201",
    account: "Northstar Health",
    model: "u-shaped",
    channel: "email-nurture",
    creditPct: 40,
    revenueCreditUsd: 11200,
    rationale: "Nurture owned the final high-intent touch before sales action."
  },
  {
    opportunityId: "OPP-305",
    account: "Meridian Cloud",
    model: "linear",
    channel: "paid-search",
    creditPct: 33.3,
    revenueCreditUsd: 5328,
    rationale: "Paid search created the first attributable session."
  },
  {
    opportunityId: "OPP-305",
    account: "Meridian Cloud",
    model: "linear",
    channel: "direct",
    creditPct: 33.3,
    revenueCreditUsd: 5328,
    rationale: "Direct revisit signals branded recall and active evaluation."
  },
  {
    opportunityId: "OPP-305",
    account: "Meridian Cloud",
    model: "linear",
    channel: "email-nurture",
    creditPct: 33.4,
    revenueCreditUsd: 5344,
    rationale: "Nurture preserved deal momentum through the final week."
  },
  {
    opportunityId: "OPP-411",
    account: "Helio Systems",
    model: "last-touch",
    channel: "direct",
    creditPct: 100,
    revenueCreditUsd: 42000,
    rationale: "The final direct session carried the conversion event under this model."
  }
];

export const modelSteps: ModelStep[] = [
  {
    id: "STEP-01",
    layer: "staging",
    artifact: "stg_marketing_touches.sql",
    purpose: "Normalize campaign, source, and session-quality signals into a single touchpoint contract."
  },
  {
    id: "STEP-02",
    layer: "intermediate",
    artifact: "int_journey_windows.sql",
    purpose: "Window and order touches so attribution models can reason about first, last, and assisted influence."
  },
  {
    id: "STEP-03",
    layer: "mart",
    artifact: "fct_multi_touch_credit.sql",
    purpose: "Materialize revenue credit per opportunity, channel, and model in a reviewable fact table."
  }
];
