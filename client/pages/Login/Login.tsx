import { useState } from "react";

interface TeamResponse {
  message: string;
}

const Login = () => {
  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [responseData, setResponseData] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputUsername,
          password: inputPassword,
        }),
      });
      console.log(response);
      const result = await response.json();
      console.log(result);
      setResponseData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2> Login </h2>
        <h4> Please enter your username & password to log in. </h4>

        <div className="login-row">
          <label htmlFor="username"> Username </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
          />
        </div>

        <div className="login-row">
          <label htmlFor="password"> Password </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>

        <button onClick={fetchUserData} disabled={loading} className="btn">
          Submit
        </button>
        {loading && <p> Loading... </p>}
        {responseData && <p>{responseData.message}</p>}
      </div>
    </div>
  );
};

export default Login;
