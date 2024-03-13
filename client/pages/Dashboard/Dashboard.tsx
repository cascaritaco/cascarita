import SideNav from "../../components/SideNav/SideNav";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dash}>
      <SideNav />
      <div className={styles.main}></div>
    </div>
  );
};

export default Dashboard;
