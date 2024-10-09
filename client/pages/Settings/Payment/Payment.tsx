import React, { useState } from "react";
import styles from "./Payment.module.css";

import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import Modal from "../../../components/Modal/Modal";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import StripeAccountForm from "../StripeAccountForm/StripeAccountForm";
import { useAuth } from "../../../components/AuthContext/AuthContext";
import { useGetStripeAccountByGroupId } from "../hooks";
import { stripeUserType } from "./types";

const Payment = () => {
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const planHeaders = [
    "Account Name",
    "Email Address",
    "Account Holder",
    "Status",
  ];

  const { currentUser } = useAuth();

  const groupId = currentUser?.group_id;
  const { data } = useGetStripeAccountByGroupId(groupId);

  const statusLabelStyling = (status: string) => {
    return {
      backgroundColor:
        status === "Complete"
          ? "#d7f7c2"
          : status === "Restricted"
          ? "#ffe7f2"
          : "#dbe7f98f",
      color:
        status === "Complete"
          ? "#006908"
          : status === "Restricted"
          ? "#b3093c"
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
            <StripeAccountForm requestType="POST" />
          </Modal.Content>
        </Modal>
      </div>

      <p style={{ marginBottom: "16px" }}>
        {
          "Below you'll find details about the Stripe accounts associated with your account."
        }
      </p>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>No leagues to display...</p>
      ) : (
        <DashboardTable
          headers={planHeaders}
          headerColor="light"
          className={styles.table}>
          {data?.map((user: stripeUserType) => (
            <tr key={user.user_id}>
              <td>{user.platform_account_name}</td>
              <td>{user.user_email}</td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>
                <p
                  style={statusLabelStyling(user.stripe_status)}
                  className={`${styles.statusLabel}`}>
                  {user.stripe_status}
                </p>
              </td>
            </tr>
          ))}
        </DashboardTable>
      )}
    </section>
  );
};

export default Payment;
