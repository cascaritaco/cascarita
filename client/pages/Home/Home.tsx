import { useState, useEffect } from "react";
import { TeamStandingsTable } from "../../components/TeamStandingsTable/TeamStandingsTable";
import styles from "./Home.module.css";

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

export interface Standing {
  league: string;
  division: string;
  teams: Team[];
}

const Home = () => {
  const [data, setData] = useState<Standing | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/mockdata/standings");
      const result = await response.json();
      console.log(response, result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching mock data:", error);
    }
  };

  return (
    <div>
      {data && (
        <div className={styles["title-container"]}>
          <h1 className={styles["league-title"]}>{data.league}</h1>
          <h2 className={styles["division-subtitle"]}>{data.division}</h2>
          <TeamStandingsTable data={data.teams} />
        </div>
      )}
    </div>
  );
};

export default Home;
