import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewLeague } from "./service";
import { LeagueFormProps } from "./types";
import { useAuth } from "../../AuthContext/AuthContext";

const LeagueForm: React.FC<LeagueFormProps> = ({ afterSave }) => {
  const [leagueName, setLeagueName] = React.useState("");
  const [leagueDesc, setLeagueDesc] = React.useState("");

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const leagueFormMutation = useMutation({
    mutationFn: createNewLeague,
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

    leagueFormMutation.mutate({
      name: leagueName,
      description: leagueDescription,
      group_id: currentUser?.group_id,
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
