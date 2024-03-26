import SideNav from "../../components/SideNav/SideNav";
import TeamModal from "../../components/TeamModal/TeamModal";
import styles from "./Dashboard.module.css";
import { useState } from "react";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  return (
    <div className={styles.dash}>
      <SideNav />
      <div className={styles.main}>
        <p>Here</p>
        <button onClick={() => openModal()}>Add Team +</button>
        <TeamModal open={show} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Dashboard;
