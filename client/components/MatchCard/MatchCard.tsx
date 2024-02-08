import React from "react";
import styles from "./MatchCard.module.css";

interface MatchCardProps {
  awayTeam: string;
  homeTeam: string;
  time: string;
  score: string;
  location: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  awayTeam,
  homeTeam,
  time,
  score,
  location,
}) => {
  return (
    <div className={styles["match-card"]}>
      <h3>
        <strong>Home:</strong> {homeTeam}
      </h3>
      <h3>
        <strong>Away:</strong> {awayTeam}
      </h3>
      <p>{time}</p>
      <p>{score}</p>
      <p>{location}</p>
    </div>
  );
};

export default MatchCard;
