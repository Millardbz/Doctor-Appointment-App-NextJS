import { z } from "zod";

export const IntakeSubmissionSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  dateOfBirth: z.string().min(1),
  symptoms: z.string().min(1),
  consent: z.boolean().refine(v => v === true, "Consent is required"),
});

export type IntakeSubmission = z.infer<typeof IntakeSubmissionSchema>;
