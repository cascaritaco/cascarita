import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FieldProps } from "../types";
import styles from "./StripeComponent.module.css";
import { createPaymentIntent } from "../../../api/stripe/service";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../../StripeForm/CheckoutForm";

interface CheckoutFormRef {
  handlePayment: () => void;
}

const StripeComponent = forwardRef(({ field }: FieldProps, ref) => {
  const [options, setOptions] = useState<StripeElementsOptions | undefined>(
    undefined,
  );
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const checkoutFormRef = useRef<CheckoutFormRef>(null);
  const normalizePriceToCents = (
    price: string | number | undefined,
  ): number => {
    if (price === undefined) {
      throw new Error("Price value is undefined");
    }

    const priceNumber = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(priceNumber)) {
      throw new Error("Invalid price value");
    }

    return Math.round(priceNumber * 100); // Convert to cents
  };

  useEffect(() => {
    const fetchStripePromise = async () => {
      setStripePromise(
        await loadStripe(
          // TODO: Public Key Needs to be fetched from the Server
          "",
          {
            stripeAccount: "acct_1Pwrm0R4osRmT1sy", // TODO: We Need customer Account ID
          },
        ),
      );
    };
    fetchStripePromise();
  }, []);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const stripeStuff = await createPaymentIntent(
          "acct_1Pwrm0R4osRmT1sy", // Customer ID
          27,
          2,
          normalizePriceToCents(field.properties?.price?.value),
          normalizePriceToCents(50),
        );
        if (stripeStuff != null && stripeStuff.client_secret != null) {
          setClientSecret(stripeStuff.client_secret);
          setOptions({
            clientSecret: stripeStuff.client_secret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#0570de",
                colorBackground: "#ffffff",
                colorText: "#30313d",
                colorDanger: "#df1b41",
              },
            },
          });
        } else {
          console.error("Failed to create PaymentIntent");
        }
      } catch (error) {
        console.error("Error fetching PaymentIntent:", error);
      }
    };

    fetchPaymentIntent();
  }, []);

  useImperativeHandle(ref, () => ({
    handlePayment: checkoutFormRef.current?.handlePayment,
  }));

  return (
    <section className={styles.container}>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>{field.title}</h3>
        {field.validations?.required && (
          <span className={styles.required}>*</span>
        )}
      </div>
      <p>{field.properties?.description}</p>
      <p>
        {field.properties?.price?.value} {field.properties?.price?.currency}
      </p>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm ref={checkoutFormRef} />
        </Elements>
      )}
    </section>
  );
});

StripeComponent.displayName = "StripeComponent";

export default StripeComponent;
