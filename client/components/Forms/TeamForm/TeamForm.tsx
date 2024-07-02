import React from "react";
import styles from "./TeamForm.module.css";
import { createNewTeam } from "../../../api/teams/service";
import { TeamFormProps } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FileUpload from "../../FileUpload/FileUpload";
import Modal from "../../Modal/Modal";
// import { useAuth } from "../../AuthContext/AuthContext";

const TeamForm: React.FC<TeamFormProps> = ({ afterSave }) => {
  const [teamName, setTeamName] = React.useState("");
  // const [teamLeague, setTeamLeague] = React.useState("");
  // const [teamSeason, setTeamSeason] = React.useState("");
  // const [teamDivision, setTeamDivision] = React.useState("");

  const queryClient = useQueryClient();
  // const { currentUser } = useAuth();
  // const groupId = currentUser?.group_id;

  const teamFormMutation = useMutation({
    mutationFn: createNewTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { teamName, teamLeague, teamSeason, teamDivision } =
      Object.fromEntries(new FormData(event.currentTarget));

    teamFormMutation.mutate({
      name: teamName,
      league: teamLeague,
      season: teamSeason,
      division: teamDivision,
    });

    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="teamName">
          Team Name
        </label>
        <input
          required
          className={styles.input}
          type="text"
          placeholder="Team Name"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Team Logo</label>

        <FileUpload className={styles.logoInputContainer} />
      </div>

      <div className={styles.formBtnContainer}>
        <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
          Cancel
        </Modal.Close>

        <div>
          <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default TeamForm;
