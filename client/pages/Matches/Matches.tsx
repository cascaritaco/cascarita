import { useEffect, useState } from "react";
import MatchCard from "../../components/MatchCard/MatchCard";

export type Game = {
  home_team: string;
  away_team: string;
  date: string;
  time: string;
  home_team_score: number | null;
  away_team_score: number | null;
  location: string;
  finished: boolean;
};

export interface Match {
  matches: Game[];
}

const Matches = () => {
  const [data, setData] = useState<Match | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/mockdata/matches");
      const result = await response.json();
      console.log(response, result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching mock data:", error);
    }
  };

  return (
    <div>
      {data &&
        data.matches.map((d, index) => <MatchCard data={d} key={index} />)}
    </div>
  );
};

export default Matches;
