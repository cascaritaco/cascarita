import React from "react";
import styles from "./LeagueForm.module.css";
import Modal from "../../components/Modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../AuthContext/types";

interface LeagueFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
  currentUser: User;
}

const addLeague = async (formData: object) => {
  const response = await fetch("/api/leagues/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response.json();
};

const LeagueForm: React.FC<LeagueFormProps> = ({ afterSave, currentUser }) => {
  const [leagueName, setLeagueName] = React.useState("");
  const [leagueDesc, setLeagueDesc] = React.useState("");

  console.log(currentUser);

  const queryClient = useQueryClient();

  const leagueFormMutation = useMutation({
    mutationFn: addLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"],
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { leagueName, leagueDescription } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const newLeague = {
      name: leagueName,
      description: leagueDescription,
      group_id: currentUser.group_id,
    };

    leagueFormMutation.mutate({
      name: newLeague.name,
      description: newLeague.description,
      group_id: newLeague.group_id,
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

      <div className={`${styles.inputContainer} ${styles.halfContainer}`}>
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

      <div className={styles.formBtnContainer}>
        <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
          Cancel
        </Modal.Close>

        <div>
          <button
            type="submit"
            onClick={() => {}}
            className={`${styles.btn} ${styles.submitBtn}`}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default LeagueForm;
