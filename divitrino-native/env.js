import * as Updates from "expo-updates";

const env = {
  baseURL: "http://0.0.0.0:3000",
};

if (Updates.releaseChannel === "prod") {
  env.baseURL = "https://api.giacomocerquone.com:3000";
}

export default env;
