interface StripeAccountFormData {
  requestType?: string;
}

interface CreateNewStripeAccountData {
  formData: StripeAccountFormData;
}

interface StripeAccountResponse {
  url: string;
}

export type {
  StripeAccountFormData,
  CreateNewStripeAccountData,
  StripeAccountResponse,
};
