import { Asset } from "expo-asset";

const loadAssets = async () => {
  await Promise.all([
    Asset.loadAsync([
      require("../assets/marker.png"),
      require("../assets/splash.png"),
    ]),
  ]);
};

export default loadAssets;
