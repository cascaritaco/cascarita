import React from "react";
import { useState } from "react";

import {
    UserFormProps,
    DeleteUserData
} from "./types";
import DeleteForm from "../DeleteForm/DeleteForm";
import styles from "../Form.module.css";
import { useDeleteUser } from "../../../api/users/mutations";

const UserForm: React.FC<UserFormProps> = ({
    afterSave,
    requestType,
    selectedUserId,
}) => {
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");

    const deleteUserMutation = useDeleteUser();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event.currentTarget)

        const { userFirstName, userLastName, userEmail, userRole } = Object.fromEntries(
            new FormData(event.currentTarget),
        );

        const data = {
            formData: {
                user_id: selectedUserId,
            },
        };

        console.log("Selected User Id: " + selectedUserId)

        switch (requestType) {
            case "DELETE":
                deleteUserMutation.mutate({
                    id: selectedUserId ? selectedUserId : 0,
                } as DeleteUserData);
                break;
            default:
                break;
        }

        afterSave();
    }

    return (
        <>
            {
                requestType == "DELETE" ? (
                    <DeleteForm
                        destructBtnLabel="Yes, I'm sure"
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <p>Are you sure you want to delete?</p>
                    </DeleteForm>
                ) : (<div />)
            }
        </>
    );
}

export default UserForm;