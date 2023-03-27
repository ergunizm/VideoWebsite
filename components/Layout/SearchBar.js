import { useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();
    router.push("/search/" + searchText);

    setSearchText("");
    searchRef.current.blur();
  };
  return (
    <form className={styles.form} onSubmit={searchHandler}>
      <input
        ref={searchRef}
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
