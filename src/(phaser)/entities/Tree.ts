import type { PlayScene } from "../scenes";

export class Tree extends Phaser.GameObjects.Sprite {
  constructor(scene: PlayScene, x: number, y: number, texture: string) {
    super(scene, x, y, "explorationAtlas", "explo-tree1");
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    // Ajustar el cuerpo de colisión para que solo sea el tronco
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(48, 64); // Ajusta el tamaño a la parte del tronco
    // body.setOffset(this.width / 2 - 10, this.height - 40); // Ajusta la posición del collider
  }
}
