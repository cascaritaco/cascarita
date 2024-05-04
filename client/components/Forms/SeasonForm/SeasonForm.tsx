import React from "react";
import styles from "./SeasonForm.module.css";
import Modal from "../../Modal/Modal";

interface SeasonFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
}

const SeasonForm: React.FC<SeasonFormProps> = ({ afterSave }) => {
  const [seasonName, setSeasonName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { seasonName, startDate, endDate } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    const newSeason = {
      name: seasonName,
      start_date: startDate,
      end_date: endDate,
      is_active: 1,
      league_id: 1,
    };

    await fetch("/api/season/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newSeason),
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
          Start Date
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
      <div className={styles.formBtnContainer}>
        <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
          Cancel
        </Modal.Close>

        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          {isLoading === false ? "Submit" : "Saving..."}
        </button>
      </div>
    </form>
  );
};

export default SeasonForm;
