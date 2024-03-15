import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import styles from "./Filter.module.css";

interface FilterProps {
  title: string;
}

const Filter: React.FC<FilterProps> = ({ title }) => {
  const [season, setSeason] = useState<string>("");
  const [division, setDivision] = useState<string>("");

  const seasonOptions = [
    { label: "s1", value: "Spring 2023" },
    { label: "s2", value: "Summer 2023" },
    { label: "s3", value: "Fall 2023" },
  ];

  const divisionOptions = [
    { label: "d1", value: "Junior" },
    { label: "d2", value: "Varsity" },
    { label: "d3", value: "Summer" },
  ];

  return (
    <div className={styles["filter-con"]}>
      <h2 className={styles["filter-header"]}>{title}</h2>
      <div className={styles["filter-dropdown-con"]}>
        <CustomDropdown
          label="Seasons"
          size="medium"
          options={seasonOptions}
          selectedOption={season}
          onChange={setSeason}
        />

        <CustomDropdown
          label="Divisions"
          size="large"
          options={divisionOptions}
          selectedOption={division}
          onChange={setDivision}
        />
        <div className={styles["filter-div"]}>
          <PrimaryButton label="Enter" size="large" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
