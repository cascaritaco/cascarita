import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    DeleteUserData,
} from "../../components/Forms/UserForm/types";
import { deleteUser } from "./service";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteUserData) => deleteUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}