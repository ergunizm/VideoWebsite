import styles from "./Header.module.css";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { Toggle } from "../../styles/Icons";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const isLoggedIn = true;
  const widthStatus = `${useWindowSize() > 900 ? 0 : 1}`;

  useEffect(() => {
    setMobile(Boolean(Number(widthStatus)));
    if (!mobile) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [widthStatus]);

  const showBar = () => {
    console.log(1);
    if (mobile) {
      setShow(!show);
    }
  };

  return (
    <div className={styles.header}>
      <ul>
        <li className={styles.logo}>
          <Link href="/">
            <a className={styles.inactive}>Logo here</a>
          </Link>
          {mobile && (
            <span className={styles.toggle} onClick={showBar}>
              <Toggle />
            </span>
          )}
        </li>
        <li className={`${styles.search} ${!show ? "nodisp" : ""}`}>
          <SearchBar />
        </li>
        {isLoggedIn && (
          <li className={!show ? "nodisp" : ""}>
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
          <li className={!show ? "nodisp" : ""}>
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
          <li className={!show ? "nodisp" : ""}>
            <Link href="/">
              <a className={styles.inactive}>Log out</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

// Hook for mobile
function useWindowSize() {
  const [windowSize, setWindowSize] = useState(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default Header;
