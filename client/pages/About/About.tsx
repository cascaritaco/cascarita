import React, { useState } from "react";

interface TeamResponse {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

const About = () => {
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/create/${inputText}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ input: inputText }),
      });
      const result = await response.json();
      setResponseData(result.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <label>
        Enter Name:
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label>
      <button onClick={fetchData} disabled={loading}>
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <p>created at: {responseData.createdAt}</p>
          <p>id: {responseData.id}</p>
          <p>name: {responseData.name}</p>
          <p>updated at: {responseData.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default About;
