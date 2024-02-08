// import React, { useState } from "react";

import MatchCard from "../../components/MatchCard/MatchCard";

const Matches = () => {
  //   const [data, setData] = useState<MockData | null>(null);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/mockdata");
  //       const result = await response.json();
  //       console.log(response, result);
  //       setData(result.data);
  //     } catch (error) {
  //       console.error("Error fetching mock data:", error);
  //     }
  //   };

  return (
    <div>
      <MatchCard
        awayTeam="Team A"
        homeTeam="Team B"
        time="12:00 PM"
        score="2-1"
        location="Stadium XYZ"
      />
      {/* Add more EventCard instances as needed */}
    </div>
  );
};

export default Matches;
