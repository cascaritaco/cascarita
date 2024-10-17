import React from "react";
import styles from "./Register.module.css";
import states from "./states.json";
import SelectMenu from "../../components/SelectMenu/SelectMenu";

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
  handleRegister,
}) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
      <p className={styles.subheading}>Organization information.</p>

      <div className={styles.inputContainer}>
        <label htmlFor="orgName">Organization Name</label>

        <input
          id="orgName"
          placeholder="Organization Name"
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="address">Address</label>

        <input
          id="address"
          placeholder="Address"
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="city">City</label>

        <input
          id="city"
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className={styles.inlineFields}>
        <div className={styles.inputContainer}>
          <label htmlFor="state">State</label>

          <SelectMenu
            placeholder="State"
            value={state}
            onValueChange={(value) => setState(value)}
            name="state"
            className={styles.selectMenu}>
            {states.map((state, idx) => (
              <SelectMenu.Item key={idx} value={state.abbreviation}>
                {state.abbreviation}
              </SelectMenu.Item>
            ))}
          </SelectMenu>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="zip-code">Zip Code</label>

          <input
            id="zip-code"
            placeholder="Zip-code"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleRegister}>Create Account</button>
    </div>
  );
};

export default OrganizationFields;
