import styles from "./Error.module.css";

type ErrorProps = {
  readonly message: string;
};

export function Error({ message }: ErrorProps) {
  return <div className={styles.error}>{message}</div>;
}
