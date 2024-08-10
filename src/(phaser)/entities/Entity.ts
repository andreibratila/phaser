import {
  IEntityFrame,
  IEntitydirection,
  IEntityhealth,
  IEntityspeed,
  IEntitystates,
} from "../interfaces";
import type { PlayScene } from "../scenes";

export class Entity {
  ctx: PlayScene;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  key: string;

  frames: IEntityFrame;
  states: IEntitystates;
  direction: IEntitydirection;
  health: IEntityhealth;
  speed: IEntityspeed;

  constructor(ctx: PlayScene, x: number, y: number, key: string) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.depth = 0;

    this.key = key;

    this.frames = {
      idle: 0,
      hurt: 3,
    };

    this.states = {
      idle: true,
      walk: false,
      hurt: false,
      dead: false,
      last: false,
    };

    this.direction = {
      last: false,
      current: "down",
    };

    this.health = {
      total: 1,
      current: 1,
    };
    this.speed = {
      base: 0,
      current: 0,
      max: 0,
    };

    // Tile position
    // Shadow
    // Sprite
  }

  // Sprite .....................................
  // createSprite() {
  //   if (this.spr) {
  //     this.createSprite.destroy();
  //   }
  //   this.spr = this.ctx.add.sprite(this.x, this.y, this.key);

  //   this.spr.setOrigin(0.5);
  // }
}
