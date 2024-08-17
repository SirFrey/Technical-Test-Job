import { parse } from "csv-parse/sync";
import fs from "node:fs";
import { columnsSchema, leadSourceValues, leadStatusValues } from "./vars.js";
export function getCSV() {
  const csvFile = fs.readFileSync("leads.csv", "utf8");
  const cvs = parse(csvFile.trim(), {
    skipRecordsWithEmptyValues: true,
    columns: columnsSchema,
    fromLine: 2,
  });
  const filteredCVS = cvs.filter((item) => {
    for (const key in item) {
      if (item[key] === "") {
        return false;
      }
    }
    return (
      leadSourceValues.includes(item.LEAD_SOURCE) &&
      leadStatusValues.includes(item.LEAD_STATUS)
    );
  });
  return filteredCVS;
}
