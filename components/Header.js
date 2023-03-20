import React from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
const Header = ({ pageName = "" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1>BLOG</h1>
      </div>
      <nav>
        <ul>
          <li className={pageName === "Home" ? styles.nav__active : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pageName === "Blog" ? styles.nav__active : ""}>
            <Link href="/blog/page/1">Blog</Link>
          </li>
          <li className={pageName === "Profile" ? styles.nav__active : ""}>
            <Link href="">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
