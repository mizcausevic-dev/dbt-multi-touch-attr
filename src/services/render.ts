import { journeyCredit, journeys, modelLane, summary, verification } from "./attributionService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/model-lane", label: "Model Lane" },
    { href: "/journey-credit", label: "Journey Credit" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #07111d;
        --shell: #0c1828;
        --panel: rgba(15, 27, 44, 0.9);
        --line: rgba(123, 164, 255, 0.16);
        --text: #eef4ff;
        --muted: #97abc7;
        --accent: #5fc7ff;
        --accent-strong: #6c7bff;
        --green: #39d98a;
        --gold: #f6c04f;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(95, 199, 255, 0.17), transparent 28%),
          radial-gradient(circle at top right, rgba(108, 123, 255, 0.15), transparent 26%),
          linear-gradient(180deg, #05101b 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell {
        max-width: 1280px;
        margin: 0 auto;
        padding: 28px 28px 40px;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 16px 18px;
        border: 1px solid var(--line);
        background: rgba(8, 16, 28, 0.82);
        border-radius: 24px;
        box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .brand-mark {
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px;
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #90cbff;
      }
      .brand-title {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }
      .brand-subtitle {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 14px;
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: flex-end;
      }
      .nav-chip {
        padding: 12px 16px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(14, 25, 41, 0.9);
        color: #dce8ff;
        font-size: 13px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(95, 199, 255, 0.95), rgba(108, 123, 255, 0.92));
        border-color: transparent;
        color: white;
        box-shadow: 0 10px 24px rgba(72, 129, 255, 0.32);
      }
      .hero {
        margin-top: 24px;
        padding: 30px 30px 34px;
        border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
      }
      .hero h1 {
        margin: 8px 0 10px;
        max-width: 920px;
        font-size: clamp(40px, 4.8vw, 66px);
        line-height: 0.96;
        letter-spacing: -0.04em;
      }
      .hero p {
        max-width: 860px;
        margin: 0;
        font-size: 21px;
        line-height: 1.5;
        color: #b6c8e5;
      }
      .section {
        margin-top: 24px;
        display: grid;
        gap: 20px;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 16px;
      }
      .panel {
        padding: 22px;
        border-radius: 26px;
        border: 1px solid var(--line);
        background: var(--panel);
      }
      .metric-label {
        color: #8fb6ea;
        letter-spacing: 0.18em;
        font-size: 12px;
        text-transform: uppercase;
      }
      .metric-value {
        margin-top: 14px;
        font-size: 44px;
        font-weight: 750;
        line-height: 1;
      }
      .metric-copy {
        margin-top: 12px;
        font-size: 14px;
        color: var(--muted);
        line-height: 1.5;
      }
      .cols-2 {
        display: grid;
        grid-template-columns: 1.08fr 0.92fr;
        gap: 20px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      .table th,
      .table td {
        padding: 14px 10px;
        border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left;
        vertical-align: top;
      }
      .table th {
        color: #8fb6ea;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }
      .table td {
        color: #e9f1ff;
        font-size: 14px;
        line-height: 1.45;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .model { background: rgba(95, 199, 255, 0.14); color: var(--accent); }
      .value { background: rgba(57, 217, 138, 0.15); color: var(--green); }
      .assist { background: rgba(246, 192, 79, 0.14); color: var(--gold); }
      .section-title {
        margin: 0;
        font-size: 28px;
        line-height: 1.1;
      }
      .section-copy {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.55;
      }
      ul.clean {
        margin: 16px 0 0;
        padding-left: 18px;
        color: #dbe7fb;
      }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      code {
        background: rgba(14, 25, 41, 0.9);
        padding: 2px 6px;
        border-radius: 8px;
      }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">MT</div>
          <div>
            <p class="eyebrow">Digital Intelligence</p>
            <h1 class="brand-title">dbt Multi Touch Attr</h1>
            <p class="brand-subtitle">Reviewable attribution logic for revenue-credit and channel influence.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const creditPreview = journeyCredit()
    .slice(0, 4)
    .map(
      (row) => `
      <tr>
        <td>${row.account}</td>
        <td><span class="tag model">${row.model}</span></td>
        <td>${row.channel}</td>
        <td>${row.creditPct}%</td>
        <td>$${row.revenueCreditUsd}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Attribution Control Plane</p>
      <h1>Pipeline credit should be explainable in SQL, not trapped inside dashboard folklore.</h1>
      <p>Model multi-touch attribution with inspectable journeys, channel-credit splits, and warehouse-ready transformations so Growth and RevOps can compare outcomes before they fund the next bet.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Touches</div>
          <div class="metric-value">${stats.touchCount}</div>
          <div class="metric-copy">Modeled journey rows feeding attribution logic.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Opportunities</div>
          <div class="metric-value">${stats.opportunityCount}</div>
          <div class="metric-copy">Pipeline records receiving attributable revenue credit.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Channels</div>
          <div class="metric-value">${stats.channelCount}</div>
          <div class="metric-copy">Distinct acquisition and assist lanes represented in the model.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Models</div>
          <div class="metric-value">${stats.modelCount}</div>
          <div class="metric-copy">Different attribution strategies exposed for audit and comparison.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Pipeline Credit</div>
          <div class="metric-value">$${stats.pipelineCreditUsd}</div>
          <div class="metric-copy">Revenue credit currently allocated across modeled channel paths.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to protect next</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <ul class="clean">
            <li>Keep touchpoints normalized before model weighting starts.</li>
            <li>Expose model differences where channel spend decisions actually happen.</li>
            <li>Treat revenue credit as a governed warehouse output, not a slide-ready guess.</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">Credit Preview</p>
          <h2 class="section-title">Revenue allocation snapshot</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Model</th>
                <th>Channel</th>
                <th>Credit</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>${creditPreview}</tbody>
          </table>
        </article>
      </div>
    </section>`;

  return layout("dbt Multi Touch Attr", "/", body);
}

export function renderModelLane() {
  const rows = modelLane()
    .map(
      (step) => `
      <tr>
        <td><span class="tag assist">${step.layer}</span></td>
        <td><code>${step.artifact}</code></td>
        <td>${step.purpose}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Model Lane</p>
      <h1>Attribution gets trustworthy when the transformation path is visible.</h1>
      <p>The model lane shows how raw touches become ordered journeys and then become channel-credit facts that finance, RevOps, and marketing can all inspect.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">dbt Flow</p>
        <h2 class="section-title">Transformations from touchpoint to credit fact.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Artifact</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("dbt Multi Touch Attr - Model Lane", "/model-lane", body);
}

export function renderJourneyCredit() {
  const journeyRows = journeys()
    .map(
      (touch) => `
      <tr>
        <td>${touch.account}</td>
        <td>${touch.opportunityId}</td>
        <td>${touch.channel}</td>
        <td>${touch.dayOffset}</td>
        <td>${touch.sessionQuality}</td>
        <td>$${touch.conversionValueUsd}</td>
      </tr>`
    )
    .join("");

  const creditRows = journeyCredit()
    .map(
      (row) => `
      <tr>
        <td>${row.account}</td>
        <td><span class="tag model">${row.model}</span></td>
        <td>${row.channel}</td>
        <td>${row.creditPct}%</td>
        <td><span class="tag value">$${row.revenueCreditUsd}</span></td>
        <td>${row.rationale}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Journey Credit</p>
      <h1>Channel influence should map back to the actual journey, not just the winning narrative.</h1>
      <p>This surface pairs raw journey touches with revenue-credit outputs so teams can see why attribution moved instead of just noticing that it changed.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Journey Rows</p>
          <h2 class="section-title">Touchpoints entering the model.</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Opportunity</th>
                <th>Channel</th>
                <th>Day Offset</th>
                <th>Quality</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>${journeyRows}</tbody>
          </table>
        </article>
        <article class="panel">
          <p class="eyebrow">Credit Output</p>
          <h2 class="section-title">Revenue allocation by model and channel.</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Model</th>
                <th>Channel</th>
                <th>Credit</th>
                <th>Revenue</th>
                <th>Rationale</th>
              </tr>
            </thead>
            <tbody>${creditRows}</tbody>
          </table>
        </article>
      </div>
    </section>`;

  return layout("dbt Multi Touch Attr - Journey Credit", "/journey-credit", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves attribution logic belongs in a governed data layer.</h1>
      <p>The value is not just having more models. The value is exposing where credit came from and making those choices auditable enough for spend, forecasting, and GTM planning.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("dbt Multi Touch Attr - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Built as a warehouse-first attribution proof surface.</h1>
      <p>This repo combines a small TypeScript control plane with dbt-style SQL assets so attribution decisions stay visible across product, finance, Growth, and RevOps workflows.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and revenue-credit posture</li>
            <li><code>/model-lane</code> dbt-style transformation flow</li>
            <li><code>/journey-credit</code> touchpoint and credit comparison</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/model-lane</code></li>
            <li><code>/api/journey-credit</code></li>
            <li><code>/api/journeys</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("dbt Multi Touch Attr - Docs", "/docs", body);
}
