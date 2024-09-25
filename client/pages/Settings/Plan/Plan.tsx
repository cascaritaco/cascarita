import styles from "./Plan.module.css";
import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

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

  const formatDate = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                  <p>Upgrade</p>
                  <p>Cancel</p>
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
          <ProgressBar
            used={70}
            total={100}
            getLabel={(used: number, total: number) =>
              `${used} of ${total} used`
            }
          />
        </div>

        <div className={styles.progressWrapper}>
          <h3>Players</h3>
          <ProgressBar
            used={10}
            total={100}
            getLabel={(used: number, total: number) =>
              `${used} of ${total} used`
            }
          />
        </div>

        <div className={styles.progressWrapper}>
          <h3>Storage</h3>
          <ProgressBar
            used={90}
            total={100}
            getLabel={(used: number, total: number) =>
              `${used} of ${total} used`
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Plan;
