import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const loginSchma = z.object({
  email: z.email(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address format." }),
});

export const resetPasswordSchema = z.object({
  id: z.string(),
  newPassword: z.string(),
});
