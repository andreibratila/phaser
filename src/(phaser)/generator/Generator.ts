import { Player } from "../entities/Players";
import { FloorGenerator } from "./FloorGenerator";

import type { PlayScene } from "../scenes";
import type { IPhaserColliders, IPhaserLayers } from "../interfaces";
import { TreesGenerator } from "./TreesGenerator";

export class Generator {
  cols;
  rows;
  layers: IPhaserLayers;
  colliders: IPhaserColliders;
  ctx;
  soldiersSelected: string[];
  assistentsSelected: string[];

  floorGenerator;
  treesGenerator;

  constructor(ctx: PlayScene, height: number, width: number) {
    this.ctx = ctx;
    this.cols = width / 32 + 2;
    this.rows = height / 32 + 4;

    this.colliders = {
      soldiers: this.ctx.physics.add.group(),
      trees: this.ctx.physics.add.group(),
    };
    this.layers = {
      floor: [],
      monsters: [],
      minerals: [],
      trees: [],
    };
    this.soldiersSelected = [];
    this.assistentsSelected = [];

    this.floorGenerator = new FloorGenerator(
      this.ctx,
      this.cols,
      this.rows,
      this.layers
    );
    this.treesGenerator = new TreesGenerator(
      this.ctx,
      this.cols,
      this.rows,
      this.layers,
      this.colliders
    );
  }
  setup() {
    this.floorGenerator.createFloor();
    this.treesGenerator.createTrees();

    this.setColiders();
  }
  // Update ..........................
  update() {
    // console.log(this.layers.trees);
    this.floorGenerator.scrollFloor();
    this.treesGenerator.updateTrees();
  }

  // Set players data ................
  setPlayersData(soldiers: string[], assistents: string[]) {
    this.soldiersSelected = soldiers;
    this.assistentsSelected = assistents;
    // this.createPlayers();
  }

  createPlayers() {
    let distance = 10;
    // Create soldiers
    this.soldiersSelected.forEach((soldier, index) => {
      const x = distance; // Simple positioning logic
      const y = 50;
      const player = new Player(this.ctx, x, y, soldier, this.colliders);
      this.colliders.soldiers.add(player);
      distance += 100;
    });

    // Create assistents
    this.assistentsSelected.forEach((assistent, index) => {
      const x = 50 + index * 50; // Simple positioning logic
      const y = 100;
      new Player(this.ctx, x, y, assistent, this.colliders);
    });
  }

  setColiders() {
    this.ctx.physics.add.collider(
      this.colliders.soldiers,
      this.colliders.soldiers
    );
    this.ctx.physics.add.collider(
      this.colliders.soldiers,
      this.colliders.trees
    );
  }
}
