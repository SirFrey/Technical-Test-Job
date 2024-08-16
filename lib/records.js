const {
  RecordOperations,
} = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record_operations");
const RecordField = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/field").Field;
const ZCRMRecord =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record").MasterModel;
const BodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/body_wrapper").BodyWrapper;
const ActionWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/action_wrapper").ActionWrapper;
const APIException =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/api_exception").APIException;
const SuccessResponse =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/success_response").SuccessResponse;
const HeaderMap =
  require("@zohocrm/nodejs-sdk-2.0/routes/header_map").HeaderMap;

class Record {
  /**
   *  Upsert Records
   * This method is used to Upsert records of a module and print the response.
   * @param {String} moduleAPIName The API Name of the module to upsert records.
   */
  static async upsertRecords(moduleAPIName) {
    //example
    //let moduleAPIName = "Leads";

    //Get instance of RecordOperations Class that takes moduleAPIName as parameter
    let recordOperations = new RecordOperations();

    //Get instance of BodyWrapper Class that will contain the request body
    let request = new BodyWrapper();

    //Array to hold Record instances
    let recordsArray = [];

    //Get instance of Record Class
    let record1 = new ZCRMRecord();

    /*
     * Call addFieldValue method that takes two arguments
     * Import the "zcrmsdk/core/com/zoho/crm/api/record/field" file
     * 1 -> Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
     * 2 -> Value
     */
    record1.addFieldValue(RecordField.Leads.CITY, "City");

    record1.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

    record1.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

    record1.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

    record1.addKeyValue("External", "KKRNP");

    /*
     * Call addKeyValue method that takes two arguments
     * 1 -> A string that is the Field's API Name
     * 2 -> Value
     */
    record1.addKeyValue("Custom_field", "Custom val");

    record1.addKeyValue("Custom_field_2", 10);

    //Add the record to array
    recordsArray.push(record1);

    let record2 = new ZCRMRecord();

    /*
     * Call addFieldValue method that takes two arguments
     * 1 -> Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
     * 2 -> Value
     */
    record2.addFieldValue(RecordField.Leads.CITY, "City");

    record2.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

    record2.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

    record2.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

    record1.addKeyValue("External", "TestExternal123456");

    /*
     * Call addKeyValue method that takes two arguments
     * 1 -> A string that is the Field's API Name
     * 2 -> Value
     */
    record2.addKeyValue("Custom_field", "Value");

    record2.addKeyValue("Custom_field_2", "value");

    //Add the record to array
    recordsArray.push(record2);

    //Set the array to data in BodyWrapper instance
    request.setData(recordsArray);

    let duplicateCheckFields = ["City", "Last_Name", "First_Name"];

    //Set the array containing duplicate check fiels to BodyWrapper instance
    request.setDuplicateCheckFields(duplicateCheckFields);

    //Get instance of HeaderMap Class
    let headerInstance = new HeaderMap();

    // await headerInstance.add(UpsertRecordsHeader.X_EXTERNAL, "Leads.External");

    //Call upsertRecords method that takes BodyWrapper instance and moduleAPIName as parameter.
    let response = await recordOperations.upsertRecords(
      moduleAPIName,
      request,
      headerInstance,
    );

    if (response != null) {
      //Get the status code from response
      console.log("Status Code: " + response.getStatusCode());

      //Get object from response
      let responseObject = response.getObject();

      if (responseObject != null) {
        //Check if expected ActionWrapper instance is received
        if (responseObject instanceof ActionWrapper) {
          //Get the array of obtained ActionResponse instances
          let actionResponses = responseObject.getData();

          actionResponses.forEach((actionResponse) => {
            //Check if the request is successful
            if (actionResponse instanceof SuccessResponse) {
              //Get the Status
              console.log("Status: " + actionResponse.getStatus().getValue());

              //Get the Code
              console.log("Code: " + actionResponse.getCode().getValue());

              console.log("Details");

              //Get the details map
              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              console.log("Message: " + actionResponse.getMessage().getValue());
            }
            //Check if the request returned an exception
            else if (actionResponse instanceof APIException) {
              //Get the Status
              console.log("Status: " + actionResponse.getStatus().getValue());

              //Get the Code
              console.log("Code: " + actionResponse.getCode().getValue());

              console.log("Details");

              //Get the details map
              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              //Get the Message
              console.log("Message: " + actionResponse.getMessage().getValue());
            }
          });
        }
        //Check if the request returned an exception
        else if (responseObject instanceof APIException) {
          //Get the Status
          console.log("Status: " + responseObject.getStatus().getValue());

          //Get the Code
          console.log("Code: " + responseObject.getCode().getValue());

          console.log("Details");

          //Get the details map
          let details = responseObject.getDetails();

          if (details != null) {
            Array.from(details.keys()).forEach((key) => {
              console.log(key + ": " + details.get(key));
            });
          }

          //Get the Message
          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  }
}
module.exports = { Record };
