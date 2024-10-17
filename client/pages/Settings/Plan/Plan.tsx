import styles from "./Plan.module.css";
import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { useFormatDate } from "../../../hooks/useFormatDate";

const Plan = () => {
  const planHeaders = ["Membership", "Status", "Renewal Date", "Actions"];
  const mockPlanData = [
    {
      id: 123,
      type: "Basic Subscription",
      status: true,
      renewalDate: Date.now(),
    },
  ];

  const formatDate = useFormatDate;

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionWrapper}>
        <h2>Current Subscription</h2>

        <DashboardTable
          headers={planHeaders}
          headerColor="light"
          className={styles.table}>
          {mockPlanData == null || mockPlanData?.length === 0 ? (
            <p>There is no information to display</p>
          ) : (
            mockPlanData?.map((user) => (
              <tr key={user.id}>
                <td>{user.type}</td>
                <td>{user.status ? <p>Active</p> : <p>Expired</p>}</td>
                <td>{formatDate(user.renewalDate)}</td>
                <td>
                  <a href="#" className={styles.link}>
                    Upgrade
                  </a>
                  <a href="#" className={styles.link}>
                    Cancel
                  </a>
                </td>
              </tr>
            ))
          )}
        </DashboardTable>
      </div>

      <div className={styles.sectionWrapper}>
        <h2>Plan Details</h2>
        <div className={styles.progressWrapper}>
          <h3>Users</h3>

          <div>
            <ProgressBar
              used={70}
              total={100}
              getLabel={(value, max) => {
                return `${value} of ${max} used`;
              }}
            />

            <span>{`${70} of ${100} used`}</span>
          </div>
        </div>

        <div className={styles.progressWrapper}>
          <h3>Players</h3>

          <div>
            <ProgressBar
              used={30}
              total={100}
              getLabel={(value, max) => {
                return `${value} of ${max} used`;
              }}
            />

            <span>{`${30} of ${100} used`}</span>
          </div>
        </div>

        <div className={styles.progressWrapper}>
          <h3>Storage</h3>

          <div>
            <ProgressBar
              used={50}
              total={100}
              getLabel={(value, max) => {
                return `${value} of ${max} used`;
              }}
            />

            <span>{`${50} of ${100} used`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
