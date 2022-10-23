import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const searchHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form className={styles.form} onSubmit={searchHandler}>
      <input type="search" placeholder="Search" />
    </form>
  );
};

export default SearchBar;
