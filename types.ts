import { z } from "zod";

export type MovementType = "left" | "right" | "stop";

const tileTypes = [
  "brick_green",
  "block_green",
  "goal_bottom",
  "goal_top",
] as const;
export const tileTypeSchema = z.enum(tileTypes);

const characterTypes = ["player", "enemy"] as const;
export const characterTypeSchema = z.enum(characterTypes);

const pickupTypes = ["default"] as const;
export const pickupTypeSchema = z.enum(pickupTypes);

export type TileType = z.infer<typeof tileTypeSchema>;

export type TileData = {
  type: TileType;
  tilesetIndex: number;
  solid: boolean;
};

export type LevelTile = {
  position: Vector2;
  type: TileType;
};

export type LevelPickup = {
  type: PickupType;
  position: Vector2;
};

export type Level = {
  id: number;
  playerPosition: Vector2;
  tiles: LevelTile[];
  characters: LevelCharacter[];
  pickups: LevelPickup[];
  goalPosition: Vector2;
};

export type Vector2 = {
  x: number;
  y: number;
};
export type CharacterType = z.infer<typeof characterTypeSchema>;
export type CharacterData = {
  type: CharacterType;
  textureKey: string;
};
export type LevelCharacter = {
  type: CharacterType;
  position: Vector2;
};

export type TextureData = {
  key: string;
  path: string;
  type: "normal" | "sheet";
  frameWidth?: number;
  frameHeight?: number;
};

export type PickupType = z.infer<typeof pickupTypeSchema>;

export const dateParseableString = z
  .string()
  .refine((str) => !isNaN(new Date(str).getTime()));

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
});

//properties that the following two schema have in common.
const fetchedLevelBaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  private: z.boolean(),
  dateCreated: dateParseableString,
  dateUpdated: dateParseableString,
  userId: z.number(),
  user: z.object({
    username: z.string(),
  }),
});

//the schema for level data used to build levels in the game.
export const fetchedLevelDataSchema = fetchedLevelBaseSchema.extend({
  goalPositionX: z.number(),
  goalPositionY: z.number(),
  playerPositionX: z.number(),
  playerPositionY: z.number(),
  characters: z.array(
    z.object({
      positionX: z.number(),
      positionY: z.number(),
      type: characterTypeSchema,
    })
  ),
  pickups: z.array(
    z.object({
      positionX: z.number(),
      positionY: z.number(),
      type: pickupTypeSchema,
    })
  ),
  tiles: z.array(
    z.object({
      positionX: z.number(),
      positionY: z.number(),
      type: tileTypeSchema,
    })
  ),
});

//the schema for level data that's fetched as part of a search.
//does not include data for building the level (characters, tiles, etc.)
export const fetchedLevelResultSchema = fetchedLevelBaseSchema.extend({
  averageRating: z.number(),
  totalRatings: z.number(),
  totalCompletions: z.number(),
});

export type FetchedLevelResult = z.infer<typeof fetchedLevelResultSchema>;

export type FetchedLevelData = z.infer<typeof fetchedLevelDataSchema>;

export type User = z.infer<typeof userSchema>;
