import { Asset } from "expo-asset";

const loadAssets = async () => {
  await Promise.all([
    Asset.loadAsync([
      require("../assets/marker.png"),
      require("../assets/splash.png"),
      require("../assets/logo.png"),
      require("../assets/full-logo.png"),
      require("../assets/splash-login.png"),
      require("../assets/bg.png"),
      require("../assets/search-deco.png"),
    ]),
  ]);
};

export default loadAssets;
