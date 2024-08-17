import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-7.0";
import { getCSV } from "../utils/csv.js";
import { handleRecordResponse } from "../utils/handleResponse.js";

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
    handleRecordResponse(response);
  }
  static async updateRecords(moduleAPIName) {
    // example's record ids to be updated (replace with your record ids)

    const ids = [3756050n, 3729017n, 3989009n];
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      moduleAPIName,
    );
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    let recordsArray = [];
    for (let id of ids) {
      let record = new ZOHOCRMSDK.Record.Record();

      //ID of the record to be updated
      await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ID, id);

      await record.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.LEAD_SOURCE,
        "Advertisement",
      );

      await record.addFieldValue(
        ZOHOCRMSDK.Record.Field.Leads.LEAD_STATUS,
        "Contacted",
      );
      recordsArray.push(record);
    }

    //Add Record instance to the array
    request.setData(recordsArray);

    let headerInstance = new ZOHOCRMSDK.HeaderMap();

    let response = await recordOperations.updateRecords(
      request,
      headerInstance,
    );
    handleRecordResponse(response);
  }
  static async deleteRecords(moduleAPIName, recordIds) {
    // identify the records to be deleted (replace with your record ids as second argument)

    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      moduleAPIName,
    );
    let paramInstance = new ZOHOCRMSDK.ParameterMap();
    /* Possible parameters for Delete Records operation */
    for (let recordId of recordIds) {
      await paramInstance.add(
        ZOHOCRMSDK.Record.DeleteRecordsParam.IDS,
        recordId,
      );
    }
    await paramInstance.add(
      ZOHOCRMSDK.Record.DeleteRecordsParam.WF_TRIGGER,
      true,
    );
    let headerInstance = new ZOHOCRMSDK.HeaderMap();

    let response = await recordOperations.deleteRecords(
      paramInstance,
      headerInstance,
    );
    handleRecordResponse(response);
  }
}
