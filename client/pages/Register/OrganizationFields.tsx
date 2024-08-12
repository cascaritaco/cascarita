import React, { useState } from "react";
import styles from './Register.module.css';


interface OrganizationFieldsProps {
  handlePreviousStep: () => void;
}

const OrganizationFields: React.FC<OrganizationFieldsProps> = (
  { handlePreviousStep }) => {
  const [orgName, setOrgName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  return (
    <div className={styles.register} data-name="register">
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
          <button onClick={handlePreviousStep}>Previous Step</button>
          <button>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFields;