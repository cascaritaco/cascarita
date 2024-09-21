import styles from "./Login.module.css";
import LogoWhite from "../../assets/logoWhite.svg";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  // const { login } = useAuth();
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [fail, setFail] = useState(false);
  const [password, setPassword] = useState("");
  const { loginWithRedirect } = useAuth0();

  // useEffect(() => {
  //   // Set the background color of the body to white
  //   document.body.style.backgroundColor = "#ffffff";
  //   // Clean up the style when the component unmounts
  //   return () => {
  //     document.body.style.backgroundColor = ""; // Restore default background color
  //   };
  // }, []);

  // const handleLogin = async () => {
  //   try {
  //     await login(email, password);
  //     navigate("/");
  //   } catch (error) {
  //     setFail(true);
  //     setEmail("");
  //     setPassword("");
  //     console.error("Login failed", error);
  //   }
  // };

  // const handleSignUp = async () => {
  //   navigate("/register");
  // };

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
        <p className={styles.loginSubHeaders}>E-mail</p>
        <input
          placeholder="Type your e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          placeholder="Type your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            console.log("Login with Redirect happening");
            loginWithRedirect();
          }}>
          Sign in
        </button>
        <button onClick={() => console.log("TODO IMPLEMENT SIGN UP")}>
          Do not have an account?
        </button>
      </div>
    </div>
  );
};

export default Login;
