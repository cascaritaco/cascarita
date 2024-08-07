import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewSeason, updateSeason, deleteSeason } from "./services";
import {
  CreateNewSeasonData,
  UpdateSeasonData,
  DeleteSeasonData,
} from "../types";

export const useCreateSeason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewSeasonData) => createNewSeason(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seasons"],
      });
    },
  });
};

export const useUpdateSeason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSeasonData) => updateSeason(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seasons"],
      });
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(`Error from Update: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["seasons"] });
        await queryClient.invalidateQueries({
          queryKey: ["seasons", { id: variables.id }],
        });
      }
    },
  });
};

export const useDeleteSeason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteSeasonData) => deleteSeason(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seasons"],
      });
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(`Error from Delete: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["seasons"] });
      }
    },
  });
};
