"use client";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

import StartGame from "./mainConfig";
import { EventBus } from "./EventBus";
import type { IRefPhaserGame } from "./interfaces";

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  soldiersSelected: string[];
  assistentsSelected: string[];
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame(
    { currentActiveScene, soldiersSelected, assistentsSelected },
    ref
  ) {
    const game = useRef<Phaser.Game | null>(null!);
    console.log(soldiersSelected, "soldiersSelected to play");
    console.log(assistentsSelected, "assistentsSelected to play");
    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = StartGame("phaser-game-container");

        if (typeof ref === "function") {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }
        if (typeof ref === "function") {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
        EventBus.emit("players-data-ready", {
          soldiersSelected,
          assistentsSelected,
        });
      });

      return () => {
        EventBus.removeListener("current-scene-ready");
      };
    }, [currentActiveScene, ref, soldiersSelected, assistentsSelected]);

    return <div id="phaser-game-container"></div>;
  }
);
