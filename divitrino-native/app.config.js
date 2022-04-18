const devVars = {
  baseApi: "http://192.168.1.65:3000",
};

const prodVars = {
  baseApi: "http://api.giacomocerquone.com:3000",
};

export default {
  name: "Divitrino",
  slug: "divitrino",
  scheme: "divitrino",
  version: "0.5.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F9F9F9",
  },
  updates: {
    fallbackToCacheTimeout: 15000,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.gc.divitrino",
    buildNumber: "0.5.0",
  },
  android: {
    adaptiveIcon: {
      // foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.gc.divitrino",
    versionCode: 1,
  },
  androidStatusBar: {
    barStyle: "dark-content",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: process.env.APP_ENV === "prod" ? prodVars : devVars,
  userInterfaceStyle: "automatic",
};
