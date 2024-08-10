"use client";
import { useRef } from "react";

import { PhaserGame } from "@/(phaser)/PhaserGame";
import type { IRefPhaserGame } from "@/(phaser)/interfaces";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function Game({ setLoading }: Props) {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setLoading(scene.scene.key !== "PlayScene");
  };

  return (
    <div className="h-[95%]">
      {
        //TODO: verify if mision finished to show the soldiers
      }
      <PhaserGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        soldiersSelected={["11", "21", "11"]}
        assistentsSelected={[]}
      />
    </div>
  );
}
export default Game;
