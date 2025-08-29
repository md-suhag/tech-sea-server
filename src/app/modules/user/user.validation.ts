import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});
