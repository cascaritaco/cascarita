import styles from "./Login.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { useState } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const google = () => {
  window.open("http://localhost:3000/api/auth/google", "_self");
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <LogoWhite className={styles.logo} />
        <h1>Welcome to cascarita!</h1>
      </div>
      <div className={styles.right}>
        <h3 className={styles.loginHeader}>Welcome back!</h3>
        <p className={styles.loginSubHeaders}>Email or username</p>
        <input
          placeholder="email or username"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div onClick={handleLogin}>
          <PrimaryButton label="Sign in" />
        </div>
        <div className={styles.divider}></div>
        <GoogleLoginButton onClick={google} />
      </div>
    </div>
  );
};

export default Login;
