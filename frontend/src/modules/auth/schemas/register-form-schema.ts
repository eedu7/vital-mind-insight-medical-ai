import { z } from "zod";

// Add proper validation
export const RegisterFormSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;
