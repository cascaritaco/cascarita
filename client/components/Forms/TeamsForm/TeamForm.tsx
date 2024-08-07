import React from "react";
import styles from "./TeamForm.module.css";
import {
  CreateNewTeamData,
  DeleteTeamData,
  TeamFormProps,
  UpdateTeamData,
} from "./types";
import FileUpload from "../../FileUpload/FileUpload";
import Modal from "../../Modal/Modal";
import { useAuth } from "../../AuthContext/AuthContext";
import {
  useCreateTeam,
  useDeleteTeam,
  useUpdateTeam,
} from "./services/mutations";
import DeleteForm from "../DeleteForm/DeleteForm";

const TeamForm: React.FC<TeamFormProps> = ({
  afterSave,
  requestType,
  teamId,
  seasonId,
  divisionId,
}) => {
  const [teamName, setTeamName] = React.useState("");
  const currentUser = useAuth();

  const createTeamMutation = useCreateTeam();
  const updateTeamMutation = useUpdateTeam();
  const deleteTeamMutation = useDeleteTeam();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const teamName = formData.get("teamName") as string;
    const teamLogo = formData.get("teamLogo") as File;

    const data = {
      formData: {
        name: teamName,
        team_logo: teamLogo,
        group_id: currentUser.currentUser?.group_id,
        division_id: divisionId,
        season_id: seasonId,
      },
    };

    switch (requestType) {
      case "POST":
        createTeamMutation.mutate(data as CreateNewTeamData);
        break;
      case "PATCH":
        updateTeamMutation.mutate({
          id: teamId,
          ...data,
        } as UpdateTeamData);
        break;
      case "DELETE":
        await deleteTeamMutation.mutateAsync({
          id: teamId ? teamId : 0,
        } as DeleteTeamData);
        break;
      default:
        throw Error("No request type was supplied");
    }

    afterSave();
  };

  return (
    <>
      {requestType === "DELETE" ? (
        <DeleteForm
          destructBtnLabel="Yes, I'm Sure"
          onSubmit={handleSubmit}
          className={styles.form}>
          <p>Are you sure you want to delete this team?</p>
        </DeleteForm>
      ) : (
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
              <button
                type="submit"
                className={`${styles.btn} ${styles.submitBtn}`}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default TeamForm;
