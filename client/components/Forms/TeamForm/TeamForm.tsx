import React from "react";
import styles from "./TeamForm.module.css";
import { createNewTeam } from "../../../api/teams/service";
import { TeamFormProps } from "./types";
import SelectMenu from "../../SelectMenu/SelectMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileUpload from "../../FileUpload/FileUpload";
import Modal from "../../Modal/Modal";

const TeamForm: React.FC<TeamFormProps> = ({ afterSave }) => {
  const [teamName, setTeamName] = React.useState("");
  const [teamLeague, setTeamLeague] = React.useState("");
  const [teamSeason, setTeamSeason] = React.useState("");
  const [teamDivision, setTeamDivision] = React.useState("");

  const queryClient = useQueryClient();

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
        <label className={styles.label} htmlFor="teamLeague">
          Team League
        </label>
        <SelectMenu
          className={`${styles.input} ${styles.selectMenu}`}
          placeholder="Select a League"
          name="teamLeague"
          value={teamLeague}
          onValueChange={(teamLeague) => setTeamLeague(teamLeague)}>
          <SelectMenu.Item value="league 1">League 1</SelectMenu.Item>
          <SelectMenu.Item value="league 2">League 2</SelectMenu.Item>
          <SelectMenu.Item value="league 3">League 3</SelectMenu.Item>
        </SelectMenu>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="teamSeason">
          Team Season
        </label>
        <SelectMenu
          className={`${styles.input} ${styles.selectMenu}`}
          placeholder="Select a Season"
          name="teamSeason"
          value={teamSeason}
          onValueChange={(teamSeason) => setTeamSeason(teamSeason)}>
          <SelectMenu.Item value="season 1">Season 1</SelectMenu.Item>
          <SelectMenu.Item value="season 2">Season 2</SelectMenu.Item>
          <SelectMenu.Item value="season 3">Season 3</SelectMenu.Item>
        </SelectMenu>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="teamDivision">
          Team Division
        </label>
        <SelectMenu
          className={`${styles.input} ${styles.selectMenu}`}
          placeholder="Select a Division"
          name="teamDivision"
          value={teamDivision}
          onValueChange={(teamDivision) => setTeamDivision(teamDivision)}>
          <SelectMenu.Item value="division 1">Division 1</SelectMenu.Item>
          <SelectMenu.Item value="division 2">Division 2</SelectMenu.Item>
          <SelectMenu.Item value="division 3">Division 3</SelectMenu.Item>
        </SelectMenu>
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
