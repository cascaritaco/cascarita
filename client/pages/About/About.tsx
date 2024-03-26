import React, { useState } from "react";
import { createTeam } from "./../../api/apiService";
import { TeamResponse } from "./../../api/types";

const About = () => {
  const [group_id, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTeamData = async () => {
    createTeam(group_id, name, setLoading, setResponseData);
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
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <p>id: {responseData.id}</p>
          <p>groupId: {responseData.group_id}</p>
          <p>name: {responseData.name}</p>
          <p>created at: {responseData.created_at}</p>
          <p>updated at: {responseData.updated_at}</p>
        </div>
      )}
    </div>
  );
};

export default About;
