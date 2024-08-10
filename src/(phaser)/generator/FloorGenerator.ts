import { randomBackgroundName } from "../helper/randomBackroundName";

import type { GameObjects } from "phaser";
import type { PlayScene } from "../scenes";
import type { IPhaserLayers } from "../interfaces";

export class FloorGenerator {
  scene;
  layers;
  cols;
  rows;
  constructor(
    scene: PlayScene,
    cols: number,
    rows: number,
    layers: IPhaserLayers
  ) {
    this.scene = scene;
    this.cols = cols;
    this.rows = rows;
    this.layers = layers;
  }

  createFloor() {
    let x, y, spr;

    // Draw bigger than camera view Height
    let cols = this.cols;

    // Save tiles in array
    let floor: GameObjects.Sprite[][] = [];

    // Loop cols & rows
    for (let ty = 0; ty < this.rows; ty++) {
      floor[ty] = [];

      for (let tx = 0; tx < cols; tx++) {
        x = tx * 32;
        y = ty * 32;

        spr = this.scene.add.sprite(
          x,
          y,
          "explorationAtlas",
          randomBackgroundName()
        );
        spr.setOrigin(0);

        floor[ty][tx] = spr;
      }
    }
    //Save floor array in generator  layers
    this.layers.floor = floor;
  }

  scrollFloor() {
    let firstRow = this.layers.floor[0];
    if (this.scene.cameras.main.scrollY <= firstRow[0].y + 32) {
      this.destroyFloorRow();
      this.appendFloorRow();
    }
  }

  destroyFloorRow() {
    let lastRow = this.layers.floor.pop();
    if (lastRow) {
      for (let spr of lastRow) {
        spr.destroy();
      }
    }
  }

  appendFloorRow() {
    let x, spr;

    let firstRow = this.layers.floor[0];
    let newY = firstRow[0].y - 32;

    let newRow: GameObjects.Sprite[] = [];
    for (let tx = 0; tx < this.cols; tx++) {
      x = tx * 32;
      spr = this.scene.add.sprite(
        x,
        newY,
        "explorationAtlas",
        randomBackgroundName()
      );
      spr.setOrigin(0);

      newRow.push(spr);
    }

    this.layers.floor.unshift(newRow);
  }
}
