import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import { DivisionFormProps } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDivision } from "./service";
import { useAuth } from "../../AuthContext/AuthContext";

const DivisionForm: React.FC<DivisionFormProps> = ({ afterSave, seasonId }) => {
  const [divisionName, setDivisionName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const divisionFormMutation = useMutation({
    mutationFn: createDivision,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["divisions"],
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { divisionName } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    divisionFormMutation.mutate({
      name: divisionName,
      group_id: currentUser?.group_id,
      season_id: seasonId,
    });

    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="seasonName">
          Division Name
        </label>
        <input
          className={styles.input}
          required
          placeholder="Division Name"
          id="divisionName"
          name="divisionName"
          value={divisionName}
          onChange={(event) => setDivisionName(event.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="league">
            League
          </label>
          <input
            className={styles.input}
            disabled
            type="text"
            id="league"
            name="league"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="league">
            Season
          </label>
          <input
            className={styles.input}
            disabled
            type="text"
            id="season"
            name="season"
          />
        </div>
      </div>

      <div className={styles.formBtnContainer}>
        <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
          Cancel
        </Modal.Close>

        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          {isLoading === true ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default DivisionForm;
