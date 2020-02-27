import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/mofie.svg';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className="navLogo">
        <NavLink className={styles.navLogoLink} to="/">
          <img src={logo} alt="Mofie" className="navLogoImg" />
        </NavLink>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            activeClassName={styles.navItemLinkActive}
            className={styles.navItemLink}
            to="/my-collection"
          >
            Collection
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            activeClassName={styles.navItemLinkActive}
            className={styles.navItemLink}
            to="/find-show"
          >
            Find Show
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            activeClassName={styles.navItemLinkActive}
            className={styles.navItemLink}
            to="/find-movie"
          >
            Find Movie
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
