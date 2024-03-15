import Modal from "react-modal";
import styles from "./TeamModal.module.css";

interface TeamModalProps {
  open: boolean;
  closeModal: any;
}

const TeamModal: React.FC<TeamModalProps> = ({ open, closeModal }) => {
  const addTeam = () => {
    //TODO: Add CREATE Team method
    closeModal();
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles["team-modal"]}
    >
      <h1 className={styles["team-modal-header"]}>Add Team</h1>
      <div className={styles["team-modal-text-container"]}>
        <p className={styles["team-modal-subheader"]}>Team Name</p>
        <input type="text" placeholder="Team Name"></input>
      </div>
      <div className={styles["team-modal-text-container"]}>
        <p className={styles["team-modal-subheader"]}>Total Players</p>
        <input type="number" placeholder="Number"></input>
      </div>
      <div className={styles["team-modal-text-container"]}>
        <p className={styles["team-modal-subheader"]}>Info</p>
        <input type="text" placeholder="Additional Info"></input>
      </div>
      <div className={styles["team-modal-button-container"]}>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={addTeam}>Submit</button>
      </div>
    </Modal>
  );
};

export default TeamModal;
