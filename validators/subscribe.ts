import { z } from "zod";

export const phoneSchema = z.object({
    phone:
        z.string()
            .regex(/^\+?[0-9]+$/, "Phone Number is required")
            .min(7, "Phone number must be at least 7 digits")
            .max(15, "Phone number cannot exceed 15 digits")
})

export type PhoneInput = z.infer<typeof phoneSchema>;
