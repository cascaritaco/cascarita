const Login = () => {
  return (
    <div className="container">
      <div className="login-container">
        <h2> Login </h2>
        <h4> Please enter your username & password to log in. </h4>

        <div className="login-row">
          <label htmlFor="username"> Username </label>
          <input type="text" id="username" />
        </div>

        <div className="login-row">
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" />
        </div>

        <button className="btn"> Submit </button>
      </div>
    </div>
  );
};

export default Login;
