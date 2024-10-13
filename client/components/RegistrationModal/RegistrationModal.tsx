import React, { useState } from "react";
import Modal from "../Modal/Modal"; // Adjust the import path as needed
import { ModalProps } from "../Modal/types";
//TODO: Arturo uses Form modules css to adjust register data, make copy as needed
import styles from "./RegistrationModal.module.css";
import SelectMenu from "../SelectMenu/SelectMenu";
import states from "./states.json";
import RadioSelect from "../RadioSelect/RadioSelect";

// Extend ModalProps to include the onRegistrationComplete callback
interface RegisterModalProps extends ModalProps {
  onRegistrationComplete: () => void; // Callback for when registration is complete
  authorization: string;
}

//TODO: GroupID comes the name of organization
//We need an API call that gets every group
// Sample organizations data
const organizations = [
  { value: "Salinas Soccer Femenil", label: "Salinas Soccer Femenil" },
  // Add more organizations as needed
];

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
  onRegistrationComplete,
  authorization,
}) => {
  const [page, setPage] = useState<number>(1);
  const [isExistingOrg, setisExistingOrg] = useState<string>("No");
  const [org, setOrg] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const incrementPageNumber = () => {
    setPage((prev) => prev + 1);
  };

  const decrementPageNumber = () => {
    setPage((prev) => prev - 1);
  };

  //TODO: Create two funcitons that sends different form data
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
          zipCode,
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
      <Modal.Content
        title={
          page === 1
            ? "Connect Existing Organization"
            : "Register Your Organization"
        }
        subtitle={
          page === 1
            ? "If you would like to connect to existing organization, please select 'Yes' and select from list"
            : "We just need a few details before we begin"
        }>
        {page === 1 && (
          <form className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <p>Are you connecting to an existing organization?</p>

              <RadioSelect
                className={styles.radioContainer}
                groupName="rd-existingOrg"
                value={isExistingOrg}
                onValueChange={(value) => setisExistingOrg(value)}
                required>
                <div>
                  <label htmlFor="rd-Yes">Yes</label>
                  <RadioSelect.Item value="Yes" id="rd-Yes" />
                </div>

                <div>
                  <label htmlFor="rd-No">No</label>
                  <RadioSelect.Item value="No" id="rd-No" />
                </div>
              </RadioSelect>

              {isExistingOrg === "Yes" && (
                <SelectMenu
                  placeholder="Select an Organization"
                  value={org}
                  onValueChange={(value) => setOrg(value)}
                  name="organization"
                  className={styles.selectMenu1}>
                  {organizations.map((org, idx) => (
                    <SelectMenu.Item key={idx} value={org.value}>
                      {org.label}
                    </SelectMenu.Item>
                  ))}
                </SelectMenu>
              )}
            </div>

            {isExistingOrg === "Yes" ? (
              <button
                style={{ marginTop: "26px" }}
                onClick={incrementPageNumber}>
                Finish
              </button>
            ) : (
              <button
                style={{ marginTop: "26px" }}
                onClick={incrementPageNumber}>
                Next
              </button>
            )}
          </form>
        )}

        {page === 2 && (
          <form className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="orgName">Organization Name</label>

              <input
                id="orgName"
                placeholder="Organization Name"
                type="text"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="address">Address</label>

              <input
                id="address"
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                  className={styles.selectMenu2}>
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

            <div className={styles.btnContainer}>
              <button className={styles.backBtn} onClick={decrementPageNumber}>
                Go Back
              </button>
              <button
                className={styles.registerBtn}
                onClick={handleRegistrationComplete}>
                Register
              </button>
            </div>
          </form>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
