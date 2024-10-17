import React, { useState } from "react";
import styles from "./Register.module.css";

interface PersonalInfoFieldsProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  handleNextStep: () => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleNextStep,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = () => {
    // Check if any fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      setSuccessMessage("");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
      return;
    }

    // If all checks pass
    setSuccessMessage("Personal information validated");
    setErrorMessage("");

    // Proceed to the next step
    handleNextStep();
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
      <p className={styles.subheading}>Account Information</p>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}

      <div className={styles.inputContainer}>
        <label htmlFor="firstName">First Name</label>

        <input
          id="firstName"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="lastName">Last Name</label>

        <input
          id="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Password</label>

        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Confirm Password</label>

        <input
          placeholder="Re-enter Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSignUp}>Next Step</button>
    </div>
  );
};

export default PersonalInfoFields;
