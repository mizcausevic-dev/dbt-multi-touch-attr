import express from "express";

import { journeyCredit, journeys, modelLane, payload, summary, verification } from "./services/attributionService";
import {
  renderDocs,
  renderJourneyCredit,
  renderModelLane,
  renderOverview,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5274);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/model-lane", (_req, res) => res.type("html").send(renderModelLane()));
app.get("/journey-credit", (_req, res) => res.type("html").send(renderJourneyCredit()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/model-lane", (_req, res) => res.json(modelLane()));
app.get("/api/journey-credit", (_req, res) => res.json(journeyCredit()));
app.get("/api/journeys", (_req, res) => res.json(journeys()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`dbt Multi Touch Attr listening on http://127.0.0.1:${port}`);
  });
}

export default app;
