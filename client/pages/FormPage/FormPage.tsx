import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";
import { FormProvider, set, useForm } from "react-hook-form";
import {
  Answer,
  AnswerMap,
  AnswerType,
  Field,
  FieldComponents,
  Form,
} from "./types";
import { createMongoResponse } from "../../api/forms/service";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFooter from "../../components/FormFooter/FormFooter";
import styles from "./FormPage.module.css";
import { createPaymentIntent } from "../../api/stripe/service";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/StripeForm/CheckoutForm";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.

const FormPage = () => {
  const { formId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any>(null);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripePromise = async () => {
      setStripePromise(
        await loadStripe(
          "", // TODO: We need Public key fetched from the server
          {
            stripeAccount: "", // TODO: We Need customer Account ID
          },
        ),
      );
    };
    fetchStripePromise();
  }, []);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const stripeStuff = await createPaymentIntent();
        if (stripeStuff != null) {
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

  const navigate = useNavigate();

  const {
    data: form,
    isLoading,
    error,
  } = useQuery<Form, Error>({
    queryKey: ["form", formId],
    queryFn: () =>
      formId
        ? getMongoFormById(formId)
        : Promise.reject(new Error("Form ID is undefined")),
  });

  const methods = useForm<{ answers: Answer[] }>({
    defaultValues: { answers: [] },
  });

  // TODO: These will be components that have styles
  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  const onSubmit = async (data: { answers: Answer[] }) => {
    const normalizedAnswers: Answer[] =
      form?.form_data.fields.map((field: Field, index: number) => {
        const answerType =
          field.type === "multiple_choice" &&
          field.properties?.allow_multiple_selection
            ? "choices"
            : (AnswerMap[field.type] as AnswerType);

        return {
          ...data.answers[index],
          field: { id: field.id, type: field.type, ref: field.ref },
          type: answerType,
        };
      }) ?? [];

    try {
      const responsesData = await createMongoResponse(
        formId ?? "",
        normalizedAnswers,
      );
      navigate("/forms");
      return responsesData;
    } catch (error) {
      console.error("Error creating responses:", error);
      throw error;
    }
  };

  return (
    <>
      <FormHeader />
      <div className={styles.container}>
        {form != null && (
          <FormProvider {...methods}>
            <form
              className={styles.formContent}
              onSubmit={methods.handleSubmit(onSubmit)}>
              <h1 className={styles.title}>{form?.form_data.title}</h1>
              <h1>Hello World</h1>
              <>
                <h1>this is our stripe form</h1>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                  </Elements>
                )}
              </>
              {form.form_data.fields.map((field: Field, index: number) => {
                const FieldComponent = FieldComponents[field.type];
                if (!FieldComponent) return null;
                return (
                  <FieldComponent key={field.id} field={field} index={index} />
                );
              })}
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </FormProvider>
        )}
      </div>
      <FormFooter />
    </>
  );
};

export default FormPage;
