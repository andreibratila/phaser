import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { Generator } from "../generator/Generator";
import initAnims from "../anims/playersAnims";

export class PlayScene extends Scene {
  generator: Generator;

  cam_speed: { base: number; current: number; max: number };
  soldiersSelected: string[];
  assistentsSelected: string[];

  constructor() {
    super("PlayScene");

    this.generator = null as any;
    this.cam_speed = { base: 1, current: 1, max: 1 };
    this.soldiersSelected = [];
    this.assistentsSelected = [];
  }
  init() {
    initAnims(this.anims);

    this.generator = new Generator(
      this,
      this.sys.canvas.height,
      this.sys.canvas.width
    );
    EventBus.on("players-data-ready", this.handlePlayersData, this);
  }
  create() {
    // Create floor
    this.generator.setup();
    EventBus.emit("current-scene-ready", this);
  }
  update(time: number, delta: number): void {
    // Camera moves down
    this.updateCamera();
    // draw new floor tiles
    //delete passed floor tiles
    this.generator.update();
  }

  // Players ..........................
  handlePlayersData(data: {
    soldiersSelected: string[];
    assistentsSelected: string[];
  }) {
    this.soldiersSelected = data.soldiersSelected;
    this.assistentsSelected = data.assistentsSelected;

    // Pass the data to the generator
    this.generator.setPlayersData(
      this.soldiersSelected,
      this.assistentsSelected
    );
  }

  // Camera ...........................
  updateCamera() {
    // Scroll camera
    this.cameras.main.setScroll(
      0,
      this.cameras.main.scrollY - this.cam_speed.current
    );
  }
}
