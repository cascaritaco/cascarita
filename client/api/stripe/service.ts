import { PaymentIntent } from "@stripe/stripe-js";

const connectStripe = async (formData: object) => {
  try {
    const response = await fetch("/api/accounts/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error connecting to Stripe: ${response.status}`);
    }

    const data = await response.json();
    const stripeUrl = data.url;
    window.open(stripeUrl, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error connecting to Stripe:", error);
  }
};

// stripeAccountId -> Customer Account ID (NOT Governing ID)
// form_id -> form id from sql not mongo db
// userId -> user id from sql (specifically the userstripeusers table)
// price -> price of the form
// fee -> fee of the form
export const createPaymentIntent = async (
  stripeAccountId: string,
  form_id: number,
  userId: number,
  price: number,
  fee: number,
): Promise<PaymentIntent | null> => {
  try {
    const response = await fetch(
      `/api/accounts/${stripeAccountId}/paymentIntent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          fee,
          form_id,
          userId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error creating payment intent: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return null;
  }
};

export { connectStripe };
