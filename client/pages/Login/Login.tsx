import styles from "./Login.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.login} data-name="login">
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <LogoWhite className={styles.logo} />
        </div>
        <h1>Welcome to cascarita!</h1>
      </div>
      <div className={styles.right}>
        <h3 className={styles.loginHeader}>Welcome back!</h3>
        {/* {fail ? <p>Login failed, please try again.</p> : <></>} */}
        <button
          onClick={() => {
            loginWithRedirect();
          }}>
          Sign in
        </button>
        <button
          onClick={() => {
            loginWithRedirect();
          }}>
          Do not have an account?
        </button>
      </div>
    </div>
  );
};

export default Login;
