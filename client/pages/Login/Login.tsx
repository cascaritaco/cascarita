const google = () => {
  window.open("http://localhost:3000/api/auth/google", "_self");
};

const Login = () => {
  return (
    <div>
      <p>Sample Login Page</p>
      <div onClick={google}>Google OAuth</div>
    </div>
  );
};

export default Login;
