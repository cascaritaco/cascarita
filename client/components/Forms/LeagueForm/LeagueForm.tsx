import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import {
  LeagueFormProps,
  CreateNewLeagueData,
  UpdateLeagueData,
  DeleteLeagueData,
} from "./types";
import { useAuth } from "../../AuthContext/AuthContext";
import DeleteForm from "../DeleteForm/DeleteForm";
import {
  useCreateLeague,
  useDeleteLeague,
  useUpdateLeague,
} from "./services/mutations";

const LeagueForm: React.FC<LeagueFormProps> = ({
  afterSave,
  requestType,
  leagueId,
}) => {
  const [leagueName, setLeagueName] = React.useState("");
  const [leagueDesc, setLeagueDesc] = React.useState("");

  const { currentUser } = useAuth();
  const createLeagueMutation = useCreateLeague();
  const updateLeagueMutation = useUpdateLeague();
  const deleteLeagueMutation = useDeleteLeague();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { leagueName, leagueDescription } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const data = {
      formData: {
        name: leagueName,
        description: leagueDescription,
        group_id: currentUser?.group_id,
      },
    };

    switch (requestType) {
      case "POST":
        createLeagueMutation.mutate(data as CreateNewLeagueData);
        break;
      case "PATCH":
        updateLeagueMutation.mutate({
          id: leagueId,
          ...data,
        } as UpdateLeagueData);
        break;
      case "DELETE":
        await deleteLeagueMutation.mutateAsync({
          id: leagueId ? leagueId : 0,
        } as DeleteLeagueData);
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
          destructBtnLabel="Yes, I'm sure"
          onSubmit={handleSubmit}
          className={styles.form}>
          <p>{`Are you sure you want to delete?`}</p>
        </DeleteForm>
      ) : (
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
                className={`${styles.btn} ${styles.submitBtn}`}>
                {requestType === "POST" ? "Create League" : "Update League"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default LeagueForm;
