import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});
