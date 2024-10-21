interface UserFormProps {
    afterSave: () => void | null;
    requestType?: "POST" | "PATCH" | "DELETE";
    selectedUserId?: number;
}

interface DeleteUserData {
    id: number;
}
interface UpdateUserData {
    id: number;
    formData: {
        user_id: number;
    };
}

export type {
    UserFormProps,
    DeleteUserData,
    UpdateUserData
};