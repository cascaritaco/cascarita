import React, { useState } from "react";
import Modal from "../Modal/Modal"; // Adjust the import path as needed
import { ModalProps } from "../Modal/types";
//TODO: Arturo uses Form modules css to adjust register data, make copy as needed
import styles from "../Forms/Form.module.css";

// Extend ModalProps to include the onRegistrationComplete callback
interface RegisterModalProps extends ModalProps {
  onRegistrationComplete: () => void; // Callback for when registration is complete
  authorization: string;
}

// Sample organizations data
const organizations = [
  { value: "Salinas Soccer Femenil", label: "Salinas Soccer Femenil" },
  // Add more organizations as needed
];

// Sample states data
const states = [{ value: "CA", label: "California" }];

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
  onRegistrationComplete,
  authorization,
}) => {
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip_code, setZipCode] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegistrationComplete = async () => {
    try {
      // Simulated API call for registration
      //TODO: use registerUser
      /* NOTE: backend call to register User needs to remove
        - password
        - role_id
      */

      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          city,
          state,
          zip_code,
          authorization,
          organization: selectedOrg,
        }), // Send registration details
      });

      if (!response.ok) {
        throw new Error("Registration failed"); // Handle error response
      }

      // Call the completion handler on success
      onRegistrationComplete();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred.",
      );
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content title="Register">
        <div>
          <div className={styles.inputContainer}>
            <label htmlFor="organization">Select Organization:</label>
            <select
              id="organization"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              required>
              <option value="" disabled>
                Select an organization
              </option>
              {organizations.map((org) => (
                <option key={org.value} value={org.value}>
                  {org.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="state">State:</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required>
              <option value="" disabled>
                Select a state
              </option>
              {states.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="zip_code">Zip Code:</label>
            <input
              type="text"
              id="zip_code"
              placeholder="Enter your zip code"
              value={zip_code}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <div className={styles.formBtnContainer}>
            <button type="button" onClick={handleRegistrationComplete}>
              Submit
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
