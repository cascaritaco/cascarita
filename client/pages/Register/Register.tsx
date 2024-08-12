import React, { useEffect, useState } from "react";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";
import styles from './Register.module.css';
import LogoWhite from "../../assets/logoWhite.svg";
import { registerUser } from "../../api/users/service";

const Register = () => {
  const [step, setStep] = useState(1); // To track the current step

  // State for PersonalInfoFields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for OrganizationFields
  const [orgName, setOrgName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const [roleId, setRoleId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [groupId, setGroupId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleRegister = async () => {
    try {
      const user = await registerUser(
        firstName,
        lastName,
        email,
        password,
        Number(roleId),
        Number(languageId),
        Number(groupId),
        orgName,
        streetAddress,
        city,
        state,
        zipCode,
        logoUrl
      );
      setSuccessMessage('User registered successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to register user');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <LogoWhite className={styles.logo} />
        </div>
        <h1>Welcome to cascarita!</h1>
      </div>
      <div className={styles.right}>
        {step === 1 && (
          <PersonalInfoFields
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <OrganizationFields
            orgName={orgName}
            setOrgName={setOrgName}
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zipCode={zipCode}
            setZipCode={setZipCode}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            handleRegister={handleRegister}
          />
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </>
  );
};

export default Register;