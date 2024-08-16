const InitializeBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/initialize_builder").InitializeBuilder;
const OAuthBuilder =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
const UserSignature =
  require("@zohocrm/nodejs-sdk-2.0/routes/user_signature").UserSignature;
const Levels = require("@zohocrm/nodejs-sdk-2.0/routes/logger/logger").Levels;
const LogBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/logger/log_builder").LogBuilder;
const USDataCenter =
  require("@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;

const { Record } = require("./records");
class Initializer {
  static async initialize() {
    const logger = new LogBuilder()
      .level(Levels.INFO)
      .filePath("./logs/info.log")
      .build();

    const userSignature = new UserSignature("moisescastellano12312@gmai.com");

    let environment = USDataCenter.PRODUCTION();

    let token = new OAuthBuilder()
      .clientId("1000.RDZ27TFHZ1P86EMH0M1AY3RTMDSTQG")
      .clientSecret("d3cd63b9919e82cdd386846dc6aba33edf6123b252")
      .grantToken(
        "1000.985aa8f59ffd49f4336080bd055af799.576109f7e2ee3676a444d7e9d1e2fda9",
      )
      .redirectURL("http://localhost:3000/callback")
      .build();

    try {
      (await new InitializeBuilder())
        .user(userSignature)
        .environment(environment)
        .token(token)
        .logger(logger)
        .initialize();
      Record.upsertRecords("Leads");
    } catch (e) {
      console.log(e);
    }
  }
}
Initializer.initialize();
