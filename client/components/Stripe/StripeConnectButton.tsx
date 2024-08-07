import React, { useState } from "react";
import StripeConnect from "../../assets/stripe/connectblurple.svg";
import styles from "./Stripe.module.css";
import { connectStripe } from "../../api/stripe/service";
import { useAuth } from "../AuthContext/AuthContext";

const ConnectWithStripeButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { currentUser } = useAuth();
  const handleClick = async () => {
    setIsConnecting(true);
    try {
      await connectStripe({
        id: currentUser?.id,
        group_id: currentUser?.group_id,
        email: currentUser?.email,
      });
    } catch (error) {
      console.error("error connecting to stripe:", error);
    } finally {
      setIsConnecting(false);
    }
  };
  return (
    <button disabled={isConnecting} onClick={handleClick}>
      <StripeConnect className={styles.connectLogo} />
    </button>
  );
};

export default ConnectWithStripeButton;
