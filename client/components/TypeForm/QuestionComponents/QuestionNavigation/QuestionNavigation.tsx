import { useEffect, useState } from "react";
import { QuestionNavigationProps } from "./types";
import styles from "./QuestionNavigation.module.css";

export function QuestionNavigation({
  children,
  showPressEnter,
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

  return (
    <div className={styles.questionNavigation}>
      <button onClick={onClick}>{children}</button>
      {isOnMobile || !showPressEnter || (
        <span>
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
}
