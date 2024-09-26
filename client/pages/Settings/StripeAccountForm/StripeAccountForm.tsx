import React, { useState } from "react";
import styles from "./StripeAccountForm.module.css";
import Modal from "../../../components/Modal/Modal";
import StripeLogo from "../../../assets/stripe/stripe_logo_solid.svg";
import { StripeAccountFormProps } from "./types";
import DeleteForm from "../../../components/Forms/DeleteForm/DeleteForm";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const StripeAccountForm: React.FC<StripeAccountFormProps> = ({
  afterSave,
  requestType,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, description } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const data = {
      formData: {
        name: name,
        description: description,
      },
    };

    console.log(data.formData);

    afterSave();
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

          <div className={styles.inputContainer}>
            <div className={styles.stripeContainer}>
              <PrimaryButton
                className={styles.stripeBtn}
                onClick={() => console.log("Stripe Button Pressed")}>
                Connect with
                <StripeLogo
                  className={styles.stripeLogo}
                  style={{
                    fill: "#FFFFFF",
                    width: "50px",
                  }}
                />
              </PrimaryButton>

              <p>
                {"Don't have a Stripe Account? "}
                <a href="#" className={styles.link}>
                  Create an Account
                </a>
              </p>
            </div>
          </div>

          <div className={styles.formBtnContainer}>
            <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
              Cancel
            </Modal.Close>

            <div>
              <button
                type="submit"
                className={`${styles.btn} ${styles.submitBtn}`}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default StripeAccountForm;
