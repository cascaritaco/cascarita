import styles from "./Login.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { useState } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fail, setFail] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setFail(true);
      setEmail("");
      setPassword("");
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
        {fail ? <p>Login failed, please try again.</p> : <></>}
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
        <button onClick={handleLogin}>Sign in</button>
      </div>
    </div>
  );
};

export default Login;
