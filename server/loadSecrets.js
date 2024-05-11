const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const { config } = require("dotenv");
const fs = require("fs");
config();

const secretName = "sentry/authtoken";
const client = new SecretsManagerClient({ region: "us-west-1" });

async function getAWSSecretAndWriteToEnv() {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
      })
    );

    const secret = JSON.parse(response.SecretString);

    const envContents = fs.readFileSync(".env", "utf8");
    if (envContents.includes(`SENTRY_AUTH_TOKEN=${secret.SENTRY_AUTH_TOKEN}`)) {
      console.log("Secret already exists in .env file.");
    } else {
      // Write the retrieved secret into the .env file
      fs.appendFileSync(
        ".env",
        `\SENTRY_AUTH_TOKEN=${secret.SENTRY_AUTH_TOKEN}`
      );
      console.log("Secret written to .env file successfully.");
    }

    console.log("Secret written to .env file successfully.");
  } catch (error) {
    console.error("Error retrieving secret:", error);
  }
}

module.exports = getAWSSecretAndWriteToEnv;
