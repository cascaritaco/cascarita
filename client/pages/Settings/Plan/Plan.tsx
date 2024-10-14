import styles from "./Plan.module.css";
import DashboardTable from "../../../components/DashboardTable/DashboardTable";

const Plan = () => {
  const planHeaders = ["Membership", "Status"];
  const mockPlanData = [
    {
      id: 123,
      type: "Pilot Program",
      status: true,
      renewalDate: Date.now(),
    },
  ];

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
              </tr>
            ))
          )}
        </DashboardTable>
      </div>
    </section>
  );
};

export default Plan;
