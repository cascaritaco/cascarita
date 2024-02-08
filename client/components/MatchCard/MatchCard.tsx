import React from "react";
import styles from "./MatchCard.module.css";
import { Game } from "../../pages/Matches/Matches";

interface MatchCardProps {
  data: Game;
}

const MatchCard: React.FC<MatchCardProps> = ({ data }) => {
  return (
    <div className={styles["match-card"]}>
      <h3>
        <strong>Home:</strong> {data.home_team}
      </h3>
      <h3>
        <strong>Away:</strong> {data.away_team}
      </h3>
      <p>
        {data.date} @ {data.time}
      </p>
      <p>{data.location}</p>
      {data.finished == true && (
        <p>
          Final Score: {data.home_team_score} - {data.away_team_score}
        </p>
      )}
    </div>
  );
};

export default MatchCard;
