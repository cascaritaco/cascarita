import React, { useState } from "react";
import styles from "./Payment.module.css";

import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import Modal from "../../../components/Modal/Modal";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import StripeAccountForm from "../StripeAccountForm/StripeAccountForm";

const Payment = () => {
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const planHeaders = [
    "Account Name",
    "Email Address",
    "Date Submitted",
    "Status",
  ];

  const mockPaymentData = [
    {
      id: 123,
      name: "Juan Ramos",
      email: "juanramos@gmail.com",
      date_submitted: Date.now(),
      status: "complete",
    },
    {
      id: 124,
      name: "Jose Patino",
      email: "josepatino@gmail.com",
      date_submitted: Date.now(),
      status: "restricted",
    },
    {
      id: 125,
      name: "Saul Reyes",
      email: "saulreyes@gmail.com",
      date_submitted: Date.now(),
      status: "pending",
    },
    {
      id: 126,
      name: "Chuy Gomez",
      email: "chuy@gmail.com",
      date_submitted: Date.now(),
      status: "complete",
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

  const statusLabelStyling = (status: string) => {
    return {
      backgroundColor:
        status === "complete"
          ? "#e9ffe8"
          : status === "restricted"
            ? "#ffeeee"
            : "#dbe7f98f",
      color:
        status === "complete"
          ? "#045502"
          : status === "restricted"
            ? "#970303"
            : "#084986",
    };
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2>Stripe Accounts</h2>

        <Modal open={isStripeModalOpen} onOpenChange={setIsStripeModalOpen}>
          <Modal.Button asChild>
            <PrimaryButton
              onClick={() => setIsStripeModalOpen(true)}
              className={styles.btn}>
              Add Stripe Account
            </PrimaryButton>
          </Modal.Button>

          <Modal.Content title="Add Stripe Account">
            <StripeAccountForm
              afterSave={() => setIsStripeModalOpen(false)}
              requestType="POST"
            />
          </Modal.Content>
        </Modal>
      </div>

      <p style={{ marginBottom: "16px" }}>
        Below you'll find details about the Stripe accounts associated with your
        account.{" "}
      </p>

      <DashboardTable
        headers={planHeaders}
        headerColor="light"
        className={styles.table}>
        {mockPaymentData == null || mockPaymentData?.length === 0 ? (
          <p>There is no information to display</p>
        ) : (
          mockPaymentData?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.date_submitted)}</td>
              <td>
                <p
                  style={statusLabelStyling(user.status)}
                  className={`${styles.statusLabel}`}>
                  {user.status}
                </p>
              </td>
            </tr>
          ))
        )}
      </DashboardTable>
    </section>
  );
};

export default Payment;
