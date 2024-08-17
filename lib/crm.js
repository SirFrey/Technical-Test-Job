import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-7.0";

// scope necesary to use the SDK: ZohoCRM.modules.ALL,ZohoCRM.settings.fields.ALL,ZohoCRM.settings.related_lists.ALL
export class Initializer {
  static async initialize() {
    const logger = new ZOHOCRMSDK.LogBuilder()
      .level(ZOHOCRMSDK.Levels.INFO)
      .filePath("./logs/info.log")
      .build();

    let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
    let token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId(process.env.CLIENT_ID)
      .clientSecret(process.env.CLIENT_SECRET)
      .grantToken(process.env.GRANT_TOKEN)
      .build();

    (await new ZOHOCRMSDK.InitializeBuilder())
      .environment(environment)
      .token(token)
      .logger(logger)
      .initialize()
      .catch((e) => {
        console.log(e);
      });
  }
}
