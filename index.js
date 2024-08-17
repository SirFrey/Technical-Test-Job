import { Initializer } from "./lib/crm.js";
import { Record } from "./lib/records.js";

await Initializer.initialize();
await Record.upsertRecords("leads");
