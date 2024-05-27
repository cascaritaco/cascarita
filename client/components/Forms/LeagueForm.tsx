import React from "react";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import RadioSelect from "../RadioSelect/RadioSelect";
import { FormProps } from "../../api/teams/types";
import styles from "./Form.module.css";

const LeagueForm: React.FC<FormProps> = ({ afterSave }) => {
  const [leagueName, setLeagueName] = React.useState("");
  const [leagueDesc, setLeagueDesc] = React.useState("");
  const [isExistingLeague, setIsExistingLeague] = React.useState("no");
  const [existingLeague, setExistingLeague] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_LEAGUES = ["English Premier League", "MLS", "Spanish LALIGA"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { leagueName, leagueDescription } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const newLeague = {
      name: leagueName,
      description: leagueDescription,
      group_id: 1,
    };

    await fetch("/api/league/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newLeague),
    });

    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="leagueName">
          Name
        </label>
        <input
          className={styles.input}
          required
          placeholder="League Name"
          id="leagueName"
          name="leagueName"
          value={leagueName}
          onChange={(event) => setLeagueName(event.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="leagueDesc">
          Description
        </label>
        <input
          className={styles.input}
          placeholder="League Description"
          id="leagueDesc"
          name="leagueDescription"
          value={leagueDesc}
          onChange={(event) => setLeagueDesc(event.target.value)}
        />
      </div>

      <fieldset>
        <div className={styles.radioContainer}>
          <legend className={styles.label}>
            Want to link an existing divison?
          </legend>

          <RadioSelect
            groupName="isExistingLeague"
            value={isExistingLeague}
            onValueChange={(isExistingLeague) =>
              setIsExistingLeague(isExistingLeague)
            }>
            <div className={styles.radioInputContainer}>
              <RadioSelect.Item id="existing-yes" value="yes" />
              <label htmlFor="existing-yes">Yes</label>

              <RadioSelect.Item id="existing-no" value="no" />
              <label htmlFor="existing-no">No</label>
            </div>
          </RadioSelect>
        </div>
      </fieldset>

      {isExistingLeague === "no" ? (
        ""
      ) : (
        <SelectMenu
          placeholder="Select a League"
          name="existingLeague"
          value={existingLeague}
          onValueChange={(value) => setExistingLeague(value)}>
          <SelectMenu.Group>
            <SelectMenu.GroupLabel className={styles.groupLabel}>
              Existing Leagues
            </SelectMenu.GroupLabel>

            {TEST_LEAGUES.map((league, idx) => (
              <SelectMenu.Item key={idx} value={league}>
                {league}
              </SelectMenu.Item>
            ))}
          </SelectMenu.Group>
        </SelectMenu>
      )}

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

export default LeagueForm;
