import z from "zod";

export const createCommentSchema = z.object({
  blog: z.string(),
  text: z.string({ message: "Comment Text is required" }),
});
