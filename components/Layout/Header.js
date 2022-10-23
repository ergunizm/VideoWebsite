import styles from "./Header.module.css";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const isLoggedIn = true;

  return (
    <div className={styles.header}>
      <ul>
        <li className={styles.logo}>
          <Link href="/">
            <a className={styles.inactive}>Logo here</a>
          </Link>
        </li>
        <li className={styles.search}>
          <SearchBar />
        </li>
        {isLoggedIn && (
          <li>
            <Link href="/favorites">
              <a
                className={
                  router.pathname == "/favorites"
                    ? `${styles.active}`
                    : `${styles.inactive}`
                }
              >
                Favorites(0)
              </a>
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link href="/login">
              <a
                className={
                  router.pathname == "/login"
                    ? `${styles.active}`
                    : `${styles.inactive}`
                }
              >
                Sign in
              </a>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link href="/">
              <a className={styles.inactive}>Log out</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
