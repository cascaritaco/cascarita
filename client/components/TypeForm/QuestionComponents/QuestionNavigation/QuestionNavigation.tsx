import { useEffect, useState } from "react";
import { QuestionNavigationProps } from "./types";
import styles from "./QuestionNavigation.module.css";

export function QuestionNavigation({
  isFinal,
  children,
  showPressEnter,
  onBackClick,
  onClick,
}: QuestionNavigationProps) {
  const [isOnMobile, setIsOnMobile] = useState(false);

  useEffect(() => {
    if (navigator?.userAgent.toLowerCase().includes("mobile")) {
      setIsOnMobile(true);
    }

    const handleResizeEvent = () => {
      setIsOnMobile(navigator?.userAgent.toLowerCase().includes("mobile"));
    };

    window.addEventListener("resize", handleResizeEvent);

    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  const handleClick = () => {
    onClick(isFinal);
  };

  return (
    <div className={styles.questionNavigation}>
      {onBackClick && <button onClick={onBackClick}>Back</button>}
      <button onClick={handleClick}>{isFinal ? "Submit" : children}</button>
      {isOnMobile || !showPressEnter || (
        <span>
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
}
