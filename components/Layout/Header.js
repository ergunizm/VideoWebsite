import styles from "./Header.module.css";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { Toggle } from "../../styles/Icons";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const widthStatus = `${useWindowSize() > 900 ? 0 : 1}`;

  const session = useSession();
  const isLoggedIn = session.data ? true : false;
  const id = session.data ? session.data.user.id : -1;

  useEffect(() => {
    setMobile(Boolean(Number(widthStatus)));
    if (!mobile) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [widthStatus]);

  const showBar = () => {
    if (mobile) {
      setShow(!show);
    }
  };

  return (
    <div className={styles.header}>
      <ul>
        <li className={styles.logo}>
          <Link legacyBehavior href="/">
            <img
              src="/logo.png"
              alt="Morningstar"
              className={styles.inactive}
            />
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
            <Link legacyBehavior href={"/favorites/" + id}>
              <a
                className={
                  router.pathname == "/favorites"
                    ? `${styles.active}`
                    : `${styles.inactive}`
                }
              >
                Favorites
              </a>
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className={!show ? "nodisp" : ""}>
            <Link legacyBehavior href="/login">
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
            <a
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
              className={styles.inactive}
            >
              Log out
            </a>
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
