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
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    fallbackToCacheTimeout: 15000,
    url: "https://u.expo.dev/5ef97f1b-8cc5-47fd-b478-b7945f628722",
  },
};
