import React from "react";
import styles from './Register.module.css';

interface OrganizationFieldsProps {
  orgName: string;
  setOrgName: (value: string) => void;
  streetAddress: string;
  setStreetAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  logoUrl: string;
  setLogoUrl: (value: string) => void;
  handleRegister: () => void;
}

const OrganizationFields: React.FC<OrganizationFieldsProps> = ({
   orgName,
   setOrgName,
   streetAddress,
   setStreetAddress,
   city,
   setCity,
   state,
   setState,
   zipCode,
   setZipCode,
   logoUrl,
   setLogoUrl,
   handleRegister,
}) => {
  return (
    <div className={styles.formContainer}>
      <h2>Sign Up</h2>
      <p>Organization information.</p>
      <input
        placeholder="Organization Name"
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <input
        placeholder="Address"
        type="text"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
      />
      <input
        placeholder="City"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className={styles.inlineFields}>
        <input
          placeholder="State"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          placeholder="Zip-code"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <input
        placeholder="Logo URL"
        type="text"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
      />
      <button onClick={handleRegister}>Create Account</button>
    </div>
  );
};

export default OrganizationFields;