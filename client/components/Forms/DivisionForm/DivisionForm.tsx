import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import { DivisionFormProps } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDivision } from "./service";
import { useAuth } from "../../AuthContext/AuthContext";

const DivisionForm: React.FC<DivisionFormProps> = ({ afterSave }) => {
  const [divisionName, setDivisionName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
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
    const { divisionName, startDate, endDate } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    divisionFormMutation.mutate({
      name: divisionName,
      start_date: startDate,
      end_date: endDate,
      group_id: currentUser?.group_id,
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
          <label className={styles.label} htmlFor="startDate">
            Start Date
          </label>
          <input
            className={styles.input}
            required
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="endDate">
            End Date
          </label>
          <input
            className={styles.input}
            required
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
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
