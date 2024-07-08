import React, { ComponentProps } from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import { SeasonFormProps } from "./types";
import { createSeason } from "./services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SeasonForm: React.FC<SeasonFormProps> = ({ afterSave, ...delegated }) => {
  const [seasonName, setSeasonName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const seasonFormMutation = useMutation({
    mutationFn: createSeason,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seasons"],
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { seasonName, startDate, endDate } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    seasonFormMutation.mutate({
      name: seasonName,
      start_date: startDate,
      end_date: endDate,
    });

    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="seasonName">
          Season Name
        </label>
        <input
          className={styles.input}
          required
          placeholder="Season Name"
          id="seasonName"
          name="seasonName"
          value={seasonName}
          onChange={(event) => setSeasonName(event.target.value)}
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

export default SeasonForm;
