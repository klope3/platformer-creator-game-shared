import { z } from "zod";
//#region tiles
const tileTypes = [
  "brick_green",
  "block_green",
  "goal_bottom",
  "goal_top",
] as const;
export const tileTypeSchema = z.enum(tileTypes);

export type TileType = z.infer<typeof tileTypeSchema>;
//#endregion
//#region characters
const characterTypes = ["player", "enemy"] as const;

export const characterTypeSchema = z.enum(characterTypes);

export type CharacterType = z.infer<typeof characterTypeSchema>;
//#endregion
//#region pickups
const pickupTypes = ["default"] as const;

export const pickupTypeSchema = z.enum(pickupTypes);

export type PickupType = z.infer<typeof pickupTypeSchema>;
//#endregion
