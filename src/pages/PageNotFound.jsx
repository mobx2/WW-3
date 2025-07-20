import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className={styles.button}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
