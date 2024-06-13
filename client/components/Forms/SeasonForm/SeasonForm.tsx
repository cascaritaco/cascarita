import React from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import Modal from "../Modal/Modal";
import { createSeason } from "../../api/teams/service";
import { FormProps } from "../../api/teams/types";
import styles from "./Form.module.css";

const SeasonForm: React.FC<FormProps> = ({ afterSave }) => {
  const [seasonName, setSeasonName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_LEAGUES = ["The Premier League"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { seasonName, startDate, endDate } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    try {
      await createSeason(
        seasonName as string,
        startDate as string,
        endDate as string,
      );
      afterSave();
    } catch (error) {
      console.error("failed to create season:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="seasonName">
          Assign League
        </label>
        <SelectMenu
          className={styles.input}
          name="existingLeague"
          value="The Premier League">
          <SelectMenu.Group>
            {TEST_LEAGUES.map((league, idx) => (
              <SelectMenu.Item key={idx} value={league}>
                {league}
              </SelectMenu.Item>
            ))}
          </SelectMenu.Group>
        </SelectMenu>
      </div>
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
