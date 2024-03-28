import React, { useState } from "react";
import { createTeam } from "./../../api/apiService";
import { TeamResponse } from "./../../api/types";

const About = () => {
  const [group_id, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTeamData = async () => {
    setLoading(true);
    try {
      const data = await createTeam(group_id, name);
      setResponseData(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <label>
        Enter Group Id:
        <input
          type="text"
          value={group_id}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </label>
      <label>
        Enter Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={handleTeamData} disabled={loading}>
        {" "}
        Fetch Data{" "}
      </button>
      {responseData && <p> Data has been sent! </p>}
    </div>
  );
};

export default About;
