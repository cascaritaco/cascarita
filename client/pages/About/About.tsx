import React, { useState } from "react";

interface TeamResponse {
  id: number;
  group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const About = () => {
  const [group_id, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/team/create`, {
        method: "POST",
        body: JSON.stringify({ group_id, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const result = await response.json();
      setResponseData(result.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  //   try {
  //     setLoading(true);

  //     const response = await fetch(`/api/create`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ group_id, name }), // Send group_id and name in the request body
  //     });
  //     const result = await response.json();
  //     setResponseData(result);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

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
      <button onClick={fetchData} disabled={loading}>
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
