import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import {
  CreateNewDivisionData,
  DeleteDivisionData,
  DivisionFormProps,
  UpdateDivisionData,
} from "./types";
import {
  useCreateDivision,
  useUpdateDivision,
  useDeleteDivision,
} from "./services/mutations";
import { useAuth } from "../../AuthContext/AuthContext";
import DeleteForm from "../DeleteForm/DeleteForm";

const DivisionForm: React.FC<DivisionFormProps> = ({
  afterSave,
  divisionId,
  requestType,
  seasonId,
}) => {
  const [divisionName, setDivisionName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { currentUser } = useAuth();

  const createDivisionMutation = useCreateDivision();
  const updateDivisionMutation = useUpdateDivision();
  const deleteDivisionMutation = useDeleteDivision();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { divisionName } = Object.fromEntries(
      new FormData(event.currentTarget),
    );
    console.log("Enter handled submit");

    const data = {
      formData: {
        name: divisionName,
        group_id: currentUser?.group_id,
        season_id: seasonId,
      },
    };

    switch (requestType) {
      case "POST":
        createDivisionMutation.mutate(data as CreateNewDivisionData);
        break;
      case "PATCH":
        updateDivisionMutation.mutate({
          id: divisionId,
          ...data,
        } as UpdateDivisionData);
        break;
      case "DELETE":
        await deleteDivisionMutation.mutateAsync({
          id: divisionId ? divisionId : 0,
        } as DeleteDivisionData);
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
          className={styles.form}
          destructBtnLabel="Yes, I am sure"
          onSubmit={handleSubmit}>
          Are you sure you want to delete this division?
        </DeleteForm>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="seasonName">
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

            <button
              type="submit"
              className={`${styles.btn} ${styles.submitBtn}`}>
              {isLoading === true ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default DivisionForm;
