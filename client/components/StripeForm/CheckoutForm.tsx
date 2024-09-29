import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = forwardRef((_props, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return false;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "An error occurred");
      } else {
        setMessage("An unexpected error occurred.");
      }
      return false;
    }

    return true;
  };

  useImperativeHandle(ref, () => ({
    handlePayment,
  }));

  return (
    <>
      <PaymentElement id="payment-element" />
      {message && <div id="payment-message">{message}</div>}
    </>
  );
});

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
