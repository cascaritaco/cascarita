import { useState, useEffect } from "react";
import { TeamStandingsTable } from "../../components/TeamStandingsTable/TeamStandingsTable";

export type Team = {
  team_name: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
};

export interface MockData {
  league: string;
  division: string;
  teams: Team[];
}

const Home = () => {
  const [data, setData] = useState<MockData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/mockdata");
      const result = await response.json();
      console.log(response, result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching mock data:", error);
    }
  };

  return (
    <div>
      <h1>Here</h1>
      {data && (
        <div>
          <h1>{data.league}</h1>
          <h2>{data.division}</h2>
          <TeamStandingsTable data={data.teams} />
        </div>
      )}
    </div>
  );
};

export default Home;
