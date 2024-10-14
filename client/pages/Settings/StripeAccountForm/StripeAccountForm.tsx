import React, { useState } from "react";
import styles from "./StripeAccountForm.module.css";

import Modal from "../../../components/Modal/Modal";
import BeatLoader from "react-spinners/BeatLoader";
import StripeLogo from "../../../assets/stripe/stripe_logo_solid.svg";
import { CreateNewStripeAccountData, StripeAccountFormData } from "./types";
import DeleteForm from "../../../components/Forms/DeleteForm/DeleteForm";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAuth } from "../../../components/AuthContext/AuthContext";
import { useCreateStripeAccountByUserId } from "../hooks";

const StripeAccountForm: React.FC<StripeAccountFormData> = ({
  requestType,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { currentUser } = useAuth();

  const createStripeAccountMutation = useCreateStripeAccountByUserId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { accountName, accountDescription } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const data = {
      formData: {
        platform_account_name: accountName,
        platform_account_description: accountDescription,
        id: currentUser?.id,
      },
    };

    createStripeAccountMutation.mutate(data as CreateNewStripeAccountData, {
      onSuccess: (response) => {
        window.open(response.url, "_self", "noopener, noreferrer");
      },
    });
  };

  return (
    <>
      {requestType === "DELETE" ? (
        <DeleteForm
          destructBtnLabel="Yes, I'm sure"
          onSubmit={handleSubmit}
          className={styles.form}>
          <p>Are you sure you want to delete?</p>
        </DeleteForm>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              required
              placeholder="Enter Account Name"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <input
              className={styles.input}
              placeholder="Description"
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.formBtnContainer}>
            <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
              Cancel
            </Modal.Close>

            <PrimaryButton
              className={styles.stripeBtn}
              onClick={() => handleSubmit}>
              {createStripeAccountMutation.isPending ? (
                <BeatLoader loading={true} color="#ffffff" />
              ) : (
                <p className={styles.stripeBtnContainer}>
                  Connect with
                  <StripeLogo
                    className={styles.stripeLogo}
                    style={{
                      fill: "#FFFFFF",
                      width: "30px",
                    }}
                  />
                </p>
              )}
            </PrimaryButton>
          </div>
        </form>
      )}
    </>
  );
};

export default StripeAccountForm;
