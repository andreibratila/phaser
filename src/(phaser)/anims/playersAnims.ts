export default (playersAnims: Phaser.Animations.AnimationManager) => {
  playersAnims.create({
    key: "21-l",
    frames: [{ key: "21-l1" }, { key: "21-l2" }, { key: "21-l3" }],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "21-r",
    frames: [{ key: "21-r1" }, { key: "21-r2" }, { key: "21-r3" }],
    frameRate: 5,
    repeat: -1,
  });

  playersAnims.create({
    key: "21-b",
    frames: [
      { key: "21-b1" },
      { key: "21-b2" },
      { key: "21-b3" },
      { key: "21-b4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "21-f",
    frames: [
      { key: "21-f1" },
      { key: "21-f2" },
      { key: "21-f3" },
      { key: "21-f4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "11-l",
    frames: [
      { key: "11-l1" },
      { key: "11-l2" },
      { key: "11-l3" },
      { key: "11-l4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "11-r",
    frames: [
      { key: "11-r1" },
      { key: "11-r2" },
      { key: "11-r3" },
      { key: "11-r4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "11-f",
    frames: [
      { key: "11-f1" },
      { key: "11-f2" },
      { key: "11-f3" },
      { key: "11-f4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
  playersAnims.create({
    key: "11-b",
    frames: [
      { key: "11-b1" },
      { key: "11-b2" },
      { key: "11-b3" },
      { key: "11-b4" },
    ],
    frameRate: 5,
    repeat: -1,
  });
};
