import { z } from "zod";
import {
  characterTypeSchema,
  pickupTypeSchema,
  tileTypeSchema,
} from "./typesMain";
//?These types are used only for parsing and validating data fetched from the backend.
export const dateParseableString = z
  .string()
  .refine((str) => !isNaN(new Date(str).getTime()));

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  joinDate: dateParseableString,
});

export const positionableSchema = z.object({
  positionX: z.number(),
  positionY: z.number(),
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
    positionableSchema.extend({
      characterTypeSchema,
    })
  ),
  pickups: z.array(
    positionableSchema.extend({
      type: pickupTypeSchema,
    })
  ),
  tiles: z.array(
    positionableSchema.extend({
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
