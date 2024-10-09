interface stripeUserType {
  id: number;
  stripe_account_id: string;
  stripe_account_name: string;
  platform_account_name: string;
  platform_account_description: string;
  account_email: string;
  support_email: string;
  stripe_status_id: number;
  stripe_status: string;
  user_id: number;
  first_name: string;
  last_name: string;
  user_email: string;
}

export type { stripeUserType };
