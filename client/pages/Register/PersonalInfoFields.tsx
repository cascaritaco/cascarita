import React, { useState } from "react";
import styles from './Register.module.css';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setSuccessMessage('Personal information validated');
    setErrorMessage('');

    // Proceed to the next step
    handleNextStep();
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sign Up</h2>
      <p>Account information.</p>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <input
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="Re-enter Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Next Step</button>
    </div>
  );
};

export default PersonalInfoFields;