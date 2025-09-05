import { z } from "zod";
import { ReactionType } from "./blogReaction.interface";

export const createBlogSchema = z.object({
  title: z.string().max(150, "Title must be less than 150 characters"),
  description: z.string(),
  category: z.string(),
});
export const updateBlogSchema = z.object({
  title: z
    .string()
    .max(150, "Title must be less than 150 characters")
    .optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const reactToBlogSchema = z.object({
  type: z.enum(Object.values(ReactionType) as [string]),
});
