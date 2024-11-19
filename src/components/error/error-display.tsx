import styles from "./error-display.module.css";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBox}>
        <h1 className={styles.errorTitle}>Error</h1>
        <p className={styles.errorMessage}>{message}</p>
      </div>
    </div>
  );
};

export { ErrorDisplay };
