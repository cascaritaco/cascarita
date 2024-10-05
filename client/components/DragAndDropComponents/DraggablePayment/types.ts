import { Control } from "react-hook-form";
import { Field, Properties, Validation } from "../DNDCanvas/types";
import { z } from "zod";

export interface DraggablePaymentProps {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  properties: Properties | undefined;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
  onCopy: () => void;
}

export const StripeAccountSchema = z.object({
  id: z.number(),
  stripe_account_id: z.string(),
  first_name: z.string(),
});

export type StripeAccount = z.infer<typeof StripeAccountSchema>;
