import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./404.module.css";

const NotFoundPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Morningstar</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/logo.ico" />
      </Head>
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
    </Fragment>
  );
};

export default NotFoundPage;
