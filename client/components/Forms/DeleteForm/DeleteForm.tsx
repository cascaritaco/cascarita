import React from "react";
import styles from "../Form.module.css";
import { DeleteFormProps } from "./types";
import Modal from "../../Modal/Modal";

const DeleteForm: React.FC<DeleteFormProps> = ({
  destructBtnLabel,
  children,
  ...delegated
}) => {
  return (
    <form {...delegated}>
      {children}
      <div className={styles.formBtnContainer}>
        <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
          Cancel
        </Modal.Close>

        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          {destructBtnLabel ? destructBtnLabel : "Confirm Delete"}
        </button>
      </div>
    </form>
  );
};

export default DeleteForm;
