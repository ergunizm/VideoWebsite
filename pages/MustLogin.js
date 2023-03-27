import Link from "next/link";
import styles from "./404.module.css";

const MustLoginPage = () => {
  return (
    <div className={styles.container}>
      <h1>401 - Unauthorized</h1>
      <p>You must be logged in to access the page</p>
      <p>Use the link below to log in</p>
      <div className={styles.linkDiv}>
        <Link className={styles.link} href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default MustLoginPage;
