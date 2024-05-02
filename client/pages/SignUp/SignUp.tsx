import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [fail, setFail] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async () => {
    const signUpData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      group_id: group,
      role_id: role,
    };
    const response = await fetch("/api/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    if (response.status == 201) {
      navigate("/");
    } else {
      setFail(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setGroup("");
      setRole("");
    }
  };

  return (
    <div>
      {fail ? <p>Sign Up Failed. Please try again</p> : <></>}
      <p>First Name</p>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <p>Last Name</p>
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <p>Email</p>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Password</p>
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>Group Id</p>
      <input
        placeholder="Group Id"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />
      <p>Role Id</p>
      <input
        placeholder="Role Id"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
