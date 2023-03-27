import Link from "next/link";
import styles from "./404.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, there is nothing to see here</p>
      <p>Use the link below to go homepage</p>
      <div className={styles.linkDiv}>
        <Link className={styles.link} href="/">
          Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
