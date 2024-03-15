import Filter from "../../components/Filter/Filter";
import SideNav from "../../components/SideNav/SideNav";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dash}>
      <SideNav />
      <div className={styles.main}>
        <Filter title="Filter" />
      </div>
    </div>
  );
};

export default Dashboard;
