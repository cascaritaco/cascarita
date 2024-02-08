import styles from "./NavBar.module.css";

// TODO: Change the style behind the Nav Bar to show which one is selected
const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <div>
          <div>
            <a role="home" href="/">
              Standings
            </a>
            <a role="matches" href="/matches">
              Matches
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
