import styles from "./Login.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.login} data-name="login">
      <div className={styles.heroContainer}>
        <LogoWhite className={styles.logo} />

        <h1>Welcome to cascarita!</h1>
      </div>

      <div className={styles.loginContainer}>
        <h3 className={styles.loginHeader}>Welcome back!</h3>
        {/* {fail ? <p>Login failed, please try again.</p> : <></>} */}
        <div className={styles.authContainer}>
          <button
            className={styles.btn}
            onClick={() => {
              loginWithRedirect();
            }}>
            Sign in
          </button>
          <p>
            Don't have an account?{" "}
            <button
              className={styles.signUpBtn}
              onClick={() => {
                loginWithRedirect();
              }}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
