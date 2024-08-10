import { GameObjects } from "phaser";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

export interface IPhaserLayers {
  floor: GameObjects.Sprite[][];
  monsters: GameObjects.Sprite[];
  minerals: GameObjects.Sprite[];
  trees: GameObjects.Sprite[];
}

export interface IPhaserColliders {
  soldiers: Phaser.Physics.Arcade.Group;
  trees: Phaser.Physics.Arcade.Group;
}
