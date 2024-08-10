import { Scene } from "phaser";

export class PreloaderScene extends Scene {
  constructor() {
    super({ key: "PreloaderScene" });
  }

  preload() {
    this.load.pack("packAssets", "/assets/game/jsons/assets.json");
  }

  create() {
    this.scene.start("PlayScene");
  }
}
