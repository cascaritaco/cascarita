import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className={styles["navbar-brand"]}>Cascarita</div>
          <div className="flex">
            <a role="home" href="/" className={styles["navbar-link"]}>
              Home
            </a>
            <a role="about" href="/about" className={styles["navbar-link"]}>
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
