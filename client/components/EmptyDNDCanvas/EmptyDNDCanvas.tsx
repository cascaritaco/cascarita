import React from "react";
import DropIcon from "../../assets/DropIcon";
import styles from "./EmptyDNDCanvas.module.css";
const EmptyDNDCanvas = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <DropIcon width={90} height={90} color={"#1D74C5"} />
      </div>
      <p className={styles.dragText}>Drag Element Into Section</p>
    </div>
  );
};
export default EmptyDNDCanvas;
