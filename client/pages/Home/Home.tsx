import React from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import styles from "./Home.module.css";
import { createTeam } from "../../api/service";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Layout>
      <p className="text-2xl font-bold underline">Home</p>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button className={styles.btn}>
          <button>Create New League</button>
        </Modal.Button>
        <Modal.Content title="Create League">
          <LeagueForm />
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

function LeagueForm() {
  const [leagueName, setLeagueName] = React.useState("");
  const [leagueDesc, setLeagueDesc] = React.useState("");
  const [isExistingLeague, setIsExistingLeague] = React.useState("no");
  const [existingLeague, setExistingLeague] = React.useState("");
  const TEST_LEAGUES = ["English Premier League", "MLS", "Spanish LALIGA"];

  const [formData, setFormData] = React.useState({
    leagueName: "",
    leagueDesc: "",
    isExistingLeague: "no",
    existingLeague: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.modalForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.Label} htmlFor="leagueName">
          Name
        </label>
        <input
          className={styles.Input}
          placeholder="League Name"
          id="leagueName"
          value={formData.leagueName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.Label} htmlFor="leagueDesc">
          Description
        </label>
        <input
          className={styles.Input}
          placeholder="League Description"
          id="leagueDesc"
          value={leagueDesc}
          onChange={(event) => setLeagueDesc(event.target.value)}
        />
      </div>

      <fieldset className={styles.fieldSet}>
        <legend className={styles.Label}>
          Want to link an existing divison?
        </legend>

        <div className={styles.radioContainer}>
          <input
            type="radio"
            name="existingLeague"
            id="existing-yes"
            value="yes"
            checked={isExistingLeague === "yes"}
            onChange={(event) => setIsExistingLeague(event.target.value)}
          />
          <label htmlFor="existing-yes">Yes</label>
        </div>

        <div className={styles.radioContainer}>
          <input
            type="radio"
            name="existingLeague"
            id="existing-no"
            value="no"
            checked={isExistingLeague === "no"}
            onChange={(event) => setIsExistingLeague(event.target.value)}
          />
          <label htmlFor="existing-no">No</label>
        </div>
      </fieldset>

      {isExistingLeague === "no" ? (
        ""
      ) : (
        <SelectMenu
          defaultValue="Select a League"
          value={existingLeague}
          onValueChange={setExistingLeague}
        >
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default Home;
