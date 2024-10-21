interface UserFormProps {
    afterSave: () => void | null;
    requestType?: "POST" | "PATCH" | "DELETE";
    selectedUserId?: number;
}

interface DeleteUserData {
    id: number;
}

export type {
    UserFormProps,
    DeleteUserData,

};