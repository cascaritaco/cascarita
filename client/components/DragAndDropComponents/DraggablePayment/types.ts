import { z } from "zod";

export const StripeAccountSchema = z.object({
  id: z.number(),
  stripe_account_id: z.string(),
  first_name: z.string(),
});

export type StripeAccount = z.infer<typeof StripeAccountSchema>;
