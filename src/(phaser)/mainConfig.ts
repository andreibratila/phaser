import { AUTO, Game, Scale } from "phaser";
import { PlayScene, PreloaderScene } from "./scenes";

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  parent: "phaser-game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true, // True for see  phisics
    },
  },
  scale: {
    mode: Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    height: "100%",
    width: "100%",
  },
  scene: [PreloaderScene, PlayScene],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
