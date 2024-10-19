interface UserFormProps {
    afterSave: () => void | null;
    requestType?: "POST" | "PATCH" | "DELETE";
    selectedUserId?: number;
}

export type {
    UserFormProps,
};