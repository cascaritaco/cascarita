import React, { useEffect, useState } from "react";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";

const Register = () => {
  const [step, setStep] = useState(1); // To track the current step

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleNextStep = () => {
    setStep(step + 1); // Move to the next step
  };

  const handlePreviousStep = () => {
    setStep(step - 1); // Move to the previous step
  };

  return (
    <>
      {step === 1 && <PersonalInfoFields handleNextStep={handleNextStep} />}
      {step === 2 && <OrganizationFields handlePreviousStep={handlePreviousStep} />}
    </>
  );
};

export default Register;