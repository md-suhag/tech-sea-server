import { z } from "zod";

export const loginSchma = z.object({
  email: z.email(),
  password: z.string(),
});
