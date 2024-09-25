import React from "react";
import styles from "./Payment.module.css";

import DashboardTable from "../../../components/DashboardTable/DashboardTable";

const Payment = () => {
  const planHeaders = [
    "Account Name",
    "Email Address",
    "Date Submitted",
    "Status",
  ];

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
        <h2>Stripe Accounts</h2>

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
    </section>
  );
};

export default Payment;
