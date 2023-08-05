import { CharacterType, PickupType, TileType } from "./typesMain";
//?These types are used exclusively for the Phaser game.
//game
export type TextureData = {
  key: string;
  path: string;
  type: "normal" | "sheet";
  frameWidth?: number;
  frameHeight?: number;
};
//game
export type CharacterData = {
  type: CharacterType;
  textureKey: string;
};
//game
export type Vector2 = {
  x: number;
  y: number;
};
//game
export type Level = {
  id: number;
  playerPosition: Vector2;
  tiles: LevelTile[];
  characters: LevelCharacter[];
  pickups: LevelPickup[];
  goalPosition: Vector2;
};
//game
export type TileData = {
  type: TileType;
  tilesetIndex: number;
  solid: boolean;
};
//game
export type LevelTile = {
  position: Vector2;
  type: TileType;
};
//game
export type LevelPickup = {
  type: PickupType;
  position: Vector2;
};
//game
export type MovementType = "left" | "right" | "stop";

export type LevelCharacter = {
  type: CharacterType;
  position: Vector2;
};
