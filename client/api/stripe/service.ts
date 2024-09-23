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

export const getClientSecret = async (
  accountId: number,
  paymentIntent: string,
): Promise<string> => {
  try {
    const response = await fetch(
      `/:${accountId}/paymentIntent/:${paymentIntent}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching client secret: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data.cleintSecret);
  } catch (error) {
    console.error("Error fetching client secret:", error);
    return "";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPaymentIntent = async (): Promise<any> => {
  try {
    const response = await fetch(
      `/api/accounts/acct_1Pwrm0R4osRmT1sy/paymentIntent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 1000,
          fee: 50,
          stripeAccountId: "acct_1Pwrm0R4osRmT1sy",
          form_id: 27, // "66f0ce55c83f8d26249f863c"
          userId: "2",
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`1 Error creating payment intent: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("2 Error creating payment intent:", error);
    return null;
  }
};

export { connectStripe };
