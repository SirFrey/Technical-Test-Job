import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-7.0";
import { columnsSchema } from "../utils/vars.js";
import { getCSV } from "../utils/csv.js";
export class Record {
  static async upsertRecords(moduleAPIName) {
    //example
    //let moduleAPIName = "module_api_name";
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      moduleAPIName,
    );
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    //Array to hold Record instances
    let recordsArray = [];
    const csv = getCSV();
    csv.forEach(async function (record) {
      let record1 = new ZOHOCRMSDK.Record.Record();
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME,
        record.FIRST_NAME,
      );
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.LAST_NAME,
        record.LAST_NAME,
      );
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.COMPANY,
        record.COMPANY,
      );
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.EMAIL,
        record.EMAIL,
      );
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.LEAD_STATUS,
        new ZOHOCRMSDK.Choice(record.LEAD_STATUS),
      );
      await record1.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.LEAD_SOURCE,
        new ZOHOCRMSDK.Choice(record.LEAD_SOURCE),
      );
      await record1.addKeyValue("Title_Custom", record.TITLE);
      // //Add the record to array
      recordsArray.push(record1);
    });
    request.setData(recordsArray);
    let duplicateCheckFields = [
      "First_Name",
      "Last_Name",
      "Company",
      "Email",
      "Lead_Source",
      "Title_Custom",
    ];
    request.setDuplicateCheckFields(duplicateCheckFields);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();
    //Call upsertRecords method that takes BodyWrapper instance and moduleAPIName as parameter.
    let response = await recordOperations.upsertRecords(
      request,
      headerInstance,
    );
    if (response != null) {
      console.log("Status Code: " + response.getStatusCode());
      let responseObject = response.getObject();
      if (responseObject != null) {
        if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
          let actionResponses = responseObject.getData();
          actionResponses.forEach((actionResponse) => {
            if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
              console.log("Status: " + actionResponse.getStatus().getValue());
              console.log("Code: " + actionResponse.getCode().getValue());
              console.log("Details");
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }
              console.log("Message: " + actionResponse.getMessage().getValue());
            } else if (
              actionResponse instanceof ZOHOCRMSDK.Record.APIException
            ) {
              console.log("Status: " + actionResponse.getStatus().getValue());
              console.log("Code: " + actionResponse.getCode().getValue());
              console.log("Details");
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }
              console.log("Message: " + actionResponse.getMessage().getValue());
            }
          });
        } else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
          console.log("Status: " + responseObject.getStatus().getValue());
          console.log("Code: " + responseObject.getCode().getValue());
          console.log("Details");
          let details = responseObject.getDetails();
          if (details != null) {
            Array.from(details.keys()).forEach((key) => {
              console.log(key + ": " + details.get(key));
            });
          }
          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  }
}
