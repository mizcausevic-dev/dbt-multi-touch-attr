import { payload, summary } from "../src/services/attributionService";

console.log("dbt-multi-touch-attr demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().credit, null, 2));
