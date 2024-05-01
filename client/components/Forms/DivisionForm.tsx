import React from "react";
import styles from "./DivisionForm.module.css";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";

interface DivisionFormProps {
  // Use to set open state from true to false after form submission
  afterSave: () => void;
}

const DivisionForm: React.FC<DivisionFormProps> = ({ afterSave }) => {
  const [divisionName, setDivisionName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLeague, setSelectedLeague] = React.useState("");
  const [selectedSeason, setSelectedSeason] = React.useState("");

  const LEAGUES = ["League A", "League B", "League C"];
  const SEASONS = ["Season 1", "Season 2", "Season 3"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { divisionName } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    // Mocking the new division data
    const newDivision = {
      name: divisionName,
      league: selectedLeague,
      season: selectedSeason,
      group_id: 1, // Assuming group_id is required for division creation
    };

    // Perform submission logic here
    console.log(newDivision);

    // Reset form state after submission
    setDivisionName("");
    setSelectedLeague("");
    setSelectedSeason("");
    setIsLoading(false);

    // Close modal or any other actions after save
    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="league">
            League
          </label>
          <SelectMenu
            placeholder="Select a League"
            name="league"
            value={selectedLeague}
            onValueChange={(value) => setSelectedLeague(value)}
          >
            <SelectMenu.Group>
              {LEAGUES.map((league, idx) => (
                <SelectMenu.Item key={idx} value={league}>
                  {league}
                </SelectMenu.Item>
              ))}
            </SelectMenu.Group>
          </SelectMenu>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="season">
            Season
          </label>
          <SelectMenu
            placeholder="Select a Season"
            name="season"
            value={selectedSeason}
            onValueChange={(value) => setSelectedSeason(value)}
          >
            <SelectMenu.Group>
              {SEASONS.map((season, idx) => (
                <SelectMenu.Item key={idx} value={season}>
                  {season}
                </SelectMenu.Item>
              ))}
            </SelectMenu.Group>
          </SelectMenu>
        </div>
      </div>

      <div
        className={`${styles.inputContainer} ${styles.divisionNameContainer}`}
      >
        <label
          className={`${styles.label} ${styles.divisionNameLabel}`}
          htmlFor="divisionName"
        >
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

export default DivisionForm;
