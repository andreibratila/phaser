import type { IPhaserColliders } from "../interfaces";
import type { PlayScene } from "../scenes";

export class Player extends Phaser.Physics.Arcade.Sprite {
  scene;
  hitSound!: Phaser.Sound.HTML5AudioSound;
  lastDirectionChangeTime;
  changeDirectionInterval;
  fixedVelocity;
  colliders;
  animationKey;

  constructor(
    scene: PlayScene,
    x: number,
    y: number,
    animationKey: string,
    colliders: IPhaserColliders
  ) {
    super(scene, x, y, animationKey);
    this.scene = scene;
    this.animationKey = animationKey;
    this.lastDirectionChangeTime = 2;
    this.changeDirectionInterval = Phaser.Math.Between(1000, 1000);
    this.fixedVelocity = 50;
    this.colliders = colliders;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.adjustBodySize();
    this.play(`${this.animationKey}-b`)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setScale(0.22);

    // this.registerSounds();
    this.changeDirection();
  }

  // Directions
  moveLeft() {
    let velocityX = 0;
    let velocityY = 0;
    velocityX = -this.fixedVelocity * 2;
    this.setVelocity(velocityX, velocityY);
    this.play(`${this.animationKey}-l`, true);
    this.changeDirectionInterval = Phaser.Math.Between(1000, 2000);
  }

  moveRight() {
    let velocityX = 0;
    let velocityY = 0;
    velocityX = this.fixedVelocity * 2;
    this.setVelocity(velocityX, velocityY);
    this.play(`${this.animationKey}-r`, true);
    this.changeDirectionInterval = Phaser.Math.Between(1000, 2000);
  }
  moveUp() {
    let velocityX = 0;
    let velocityY = 0;
    velocityY = -this.fixedVelocity * 3;
    this.setVelocity(velocityX, velocityY);
    this.play(`${this.animationKey}-b`, true);
    this.changeDirectionInterval = Phaser.Math.Between(1000, 2000);
  }
  moveDown() {
    let velocityX = 0;
    let velocityY = 0;
    velocityY = this.fixedVelocity * 0.5;
    this.setVelocity(velocityX, velocityY);
    this.play(`${this.animationKey}-f`, true);
    this.changeDirectionInterval = Phaser.Math.Between(1000, 2000);
  }
  changeDirection() {
    // Generate Random Direction (0: Left, 1: right, 2: up, 3: down)
    const direction = Phaser.Math.Between(0, 3);

    // Set Speed in function of Direction
    switch (direction) {
      case 0:
        this.moveLeft();
        break;
      case 1:
        this.moveRight();
        break;
      case 2:
        this.moveUp();
        break;
      case 3:
        this.moveDown();
        break;
    }
  }
  adjustBodySize() {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const spriteWidth = 260;
    const spriteHeight = 260;
    // Adjust the body size to the correct size
    body.setSize(spriteWidth, spriteHeight).setOffset(1, 2).setBounce(1);
  }

  update(time: number, delta: number) {
    if (time > this.lastDirectionChangeTime + this.changeDirectionInterval) {
      this.changeDirection();
      this.lastDirectionChangeTime = time;
    }

    // Restrict player position to camera boundaries
    this.constrainToCameraBounds();
  }
  constrainToCameraBounds() {
    const camera = this.scene.cameras.main;
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (body.x < camera.worldView.x) {
      body.x = camera.worldView.x;
      this.moveRight();
    } else if (
      body.x + body.width >
      camera.worldView.x + camera.worldView.width
    ) {
      body.x = camera.worldView.x + camera.worldView.width - body.width;
      this.moveLeft();
    }

    if (body.y < camera.worldView.y) {
      body.y = camera.worldView.y;
      this.moveDown();
    } else if (
      body.y + body.height >
      camera.worldView.y + camera.worldView.height
    ) {
      body.y = camera.worldView.y + camera.worldView.height - body.height;
      this.moveUp();
    }
  }

  // registerSounds() {
  //   this.hitSound = this.scene.sound.add("hit", {
  //     volume: 0.2,
  //   }) as Phaser.Sound.HTML5AudioSound;
  // }
}
