const connectStripe = async () => {
  try {
    const response = await fetch("/api/accounts/stripe-oauth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Error connecting to Stripe: ${response.status}`);
    }

    const data = await response.json();

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      throw new Error("Missing redirect URL from server");
    }
  } catch (error) {
    console.error("Error connecting to Stripe:", error);
  }
};

export { connectStripe };
