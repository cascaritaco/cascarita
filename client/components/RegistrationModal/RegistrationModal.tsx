import React, { useState } from "react";
import Modal from "../Modal/Modal"; // Adjust the import path as needed
import { ModalProps } from "../Modal/types";

import styles from "./RegistrationModal.module.css";
import SelectMenu from "../SelectMenu/SelectMenu";
import states from "./states.json";
import RadioSelect from "../RadioSelect/RadioSelect";
import { useGetAllGroups } from "../../api/groups/query";
import { useRegisterUser } from "../../api/users/mutation";
import { GroupType } from "../../api/groups/types";
import { RegisterUser } from "../../api/users/types";

//TODO: Arturo uses Form modules css to adjust register data, make copy as needed
import { useAuth0 } from "@auth0/auth0-react";

// Extend ModalProps to include the onRegistrationComplete callback
interface RegisterModalProps extends ModalProps {
  onRegistrationComplete: () => void; // Callback for when registration is complete
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
  onRegistrationComplete,
}) => {
  const [page, setPage] = useState(1);
  const [isExistingOrg, setisExistingOrg] = useState("No");
  const [org, setOrg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const registerUserMutation = useRegisterUser();

  const incrementPageNumber = () => {
    setPage((prev) => prev + 1);
  };

  const decrementPageNumber = () => {
    setPage((prev) => prev - 1);
  };

  const { data } = useGetAllGroups();

  const handleRegistrationComplete = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formEntries = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as Record<string, string>;
    const { groupId, orgName, address, state, city, zipCode } = formEntries;
    const token = await getAccessTokenSilently();

    const payload = {
      group_id: groupId,
      name: orgName,
      streetAddress: address,
      city: city,
      state: state,
      zipCode: zipCode,
      logoUrl: null,
      token: token,
    };
    registerUserMutation.mutate(payload as RegisterUser);

    onRegistrationComplete();
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
          <form
            onSubmit={handleRegistrationComplete}
            className={styles.formContainer}>
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
                  name="groupId"
                  className={styles.selectMenu1}>
                  {data?.map((group: GroupType) => (
                    <SelectMenu.Item key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectMenu.Item>
                  ))}
                </SelectMenu>
              )}
            </div>

            {isExistingOrg === "Yes" ? (
              <button style={{ marginTop: "26px" }}>Finish</button>
            ) : (
              <button
                onClick={incrementPageNumber}
                style={{ marginTop: "26px" }}>
                Next
              </button>
            )}
          </form>
        )}

        {page === 2 && (
          <form
            onSubmit={handleRegistrationComplete}
            className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="orgName">Organization Name</label>

              <input
                id="orgName"
                required
                name="orgName"
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
                required
                name="address"
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
                required
                name="city"
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
                  required
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
                  required
                  name="zipCode"
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
              <button className={styles.registerBtn}>Register</button>
            </div>
          </form>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
