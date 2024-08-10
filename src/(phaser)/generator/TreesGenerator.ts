import { Tree } from "../entities/Tree";
import { randomTreesNames } from "../helper/randomTreesNames";
import type { IPhaserColliders, IPhaserLayers } from "../interfaces";
import type { PlayScene } from "../scenes";

export class TreesGenerator {
  scene;
  layers;
  colliders;
  cols;
  rows;

  constructor(
    scene: PlayScene,
    cols: number,
    rows: number,
    layers: IPhaserLayers,
    colliders: IPhaserColliders
  ) {
    this.scene = scene;
    this.cols = cols;
    this.rows = rows;
    this.layers = layers;
    this.colliders = colliders;
  }
  createTrees() {
    let x, y, tree;
    // Loop through the rows and columns
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.random() > 0.9) {
          // 10% chance to place a tree
          x = j * 32;
          y = i * 32;

          const texture = randomTreesNames();
          tree = new Tree(this.scene, x, y, texture);

          this.layers.trees.push(tree);
          // this.colliders.trees.add(tree);
        }
      }
    }
  }

  updateTrees() {
    if (this.scene.cameras.main.scrollY <= this.layers.trees[0].y + 32) {
      this.destroyTrees();
      this.appendTree();
    }
  }

  destroyTrees() {
    // Loop through all trees and remove those outside the visible area
    for (let i = this.layers.trees.length - 1; i >= 0; i--) {
      const tree = this.layers.trees[i];
      if (
        tree.y >
        this.scene.cameras.main.scrollY + this.scene.cameras.main.height + 50
      ) {
        // If the tree is 50 pixels below the camera, delete it
        tree.destroy();
        this.layers.trees.splice(i, 1);
      }
    }
  }

  appendTree() {
    if (Math.random() > 0.9) {
      let x = Math.floor(Math.random() * this.cols) * 32; // Random position in X
      let y = this.scene.cameras.main.scrollY - 100; // Position well above the camera

      const tree = new Tree(this.scene, x, y, randomTreesNames());

      this.layers.trees.push(tree);
      // this.colliders.trees.add(tree);
    }
  }
}
