import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  label?: string;
  used: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, used, total }) => {
  const percentage = (used / total) * 100;

  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.label}>
        <span>{label}</span>
        <span>
          {used} of {total} used
        </span>
      </div>

      <div
        className={styles.barBackground}
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${label} usage`}
        tabIndex={0}>
        <div
          className={styles.barFill}
          style={{ width: `${percentage}` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
