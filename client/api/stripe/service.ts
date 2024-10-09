import { QueryFunctionContext } from "@tanstack/react-query";
import {
  CreateNewStripeAccountData,
  StripeAccountResponse,
} from "../../pages/Settings/StripeAccountForm/types";

type UserQueryKey = [string, number];

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

const getStripeAccountsByGroupID = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, groupId] = queryKey;
  try {
    const response = await fetch(`/api/accounts/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching stripe accounts: ", error);
    throw error;
  }
};

const createStripeAccount = async (
  data: CreateNewStripeAccountData,
): Promise<StripeAccountResponse> => {
  try {
    const response = await fetch("/api/accounts/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.formData),
    });

    return response.json();
  } catch (error) {
    console.error("Error creating league: ", error);
    throw error;
  }
};

export { connectStripe, getStripeAccountsByGroupID, createStripeAccount };
