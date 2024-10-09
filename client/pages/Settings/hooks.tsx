import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStripeAccount,
  getStripeAccountsByGroupID,
} from "../../api/stripe/service";
import { CreateNewStripeAccountData } from "./StripeAccountForm/types";

const useGetStripeAccountByGroupId = (groupId: number | undefined) =>
  useQuery({
    queryKey: ["stripe_account", groupId ? groupId : 0],
    queryFn: getStripeAccountsByGroupID,
  });

const useCreateStripeAccountByUserId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewStripeAccountData) => createStripeAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stripe_account"],
      });
    },
  });
};
export { useGetStripeAccountByGroupId, useCreateStripeAccountByUserId };
