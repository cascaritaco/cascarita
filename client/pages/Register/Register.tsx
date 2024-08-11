import { useEffect, useState } from "react";
import styles from './Register.module.css';
import { registerUser } from "../../api/users/service";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [name, setName] = useState('');
  const [stressAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const user = await registerUser(
        firstName,
        lastName,
        email,
        password,
        roleId,
        Number(languageId),
        groupId,
        name,
        stressAddress,
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
    <div className={styles.register} data-name="register">
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
    </div>
  );
};

export default Register;