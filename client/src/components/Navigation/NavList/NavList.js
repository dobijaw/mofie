import React from 'react';
import { routes } from 'routes';
import styles from './NavList.module.scss';
import NavItem from './NavItem/NavItem';

const NavList = ({ isOpen }) => (
  <div className={isOpen ? styles.navListActive : styles.navList}>
    <ul className={styles.navListItem}>
      <NavItem name="Movies" link={routes.movies} />
      <NavItem name="Shows" link={routes.shows} />
      <NavItem name="Collection" link={routes.collection} />
      <NavItem name="Login" link={routes.login} asPrimary />
    </ul>
  </div>
);

export default NavList;
