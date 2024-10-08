import React, { useEffect, useState } from "react";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";
import styles from "./Register.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { registerUser } from "../../api/users/service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1); // To track the current step

  // State for PersonalInfoFields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for OrganizationFields
  const [orgName, setOrgName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Adding the functionality to this in the NEXT PR
  // eslint-disable-next-line
  const [roleId, setRoleId] = useState("");
  // eslint-disable-next-line
  const [groupId, setGroupId] = useState("");
  // eslint-disable-next-line
  const [languageId, setLanguageId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    if (successMessage === "User registered successfully") {
      // Set a timeout to navigate after a delay, e.g., 2 seconds
      const timer = setTimeout(() => {
        navigate("/login"); // Replace with your desired path
      }, 2000);
      return () => {
        document.body.style.backgroundColor = "";
        clearTimeout(timer);
      };
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [successMessage, navigate]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Simulate setting the successMessage, e.g., after a registration API call
  const handleRegistration = () => {
    // Simulate API call and on success set the successMessage
    setTimeout(() => {
      setSuccessMessage("User registered successfully");
    }, 1000); // Simulate a 1 second delay for API call
  };

  const handleRegister = async () => {
    try {
      await registerUser(
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
      );
      handleRegistration();
    } catch (error) {
      setErrorMessage("Failed to register user");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <LogoWhite className={styles.logo} />
        </div>
        <h1>Welcome to cascarita!</h1>
        <p>Play Beyond Boundaries: Your League, Your Legacy</p>
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
            handleRegister={handleRegister}
          />
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Register;
