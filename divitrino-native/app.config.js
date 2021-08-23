import "dotenv/config";

export default {
  name: "divitrino",
  slug: "divitrino",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F9F9F9",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      // foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  androidStatusBar: {
    barStyle: "dark-content",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    baseApi: process.env.BASE_API,
  },
};
