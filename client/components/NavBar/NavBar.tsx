import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <div>
          <div>
            <a href="/">Standings</a>
            <a href="/matches">Matches</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
