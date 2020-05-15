import React from 'react';
import styles from './NavList.module.scss';
import NavItem from './NavItem/NavItem';

const NavList = ({ isOpen }) => (
  <div className={isOpen ? styles.navListActive : styles.navList}>
    <ul className={styles.navListItem}>
      <NavItem name="Movies" link="/movies" />
      <NavItem name="Shows" link="/shows" />
      <NavItem name="Collection" link="/collection" />
    </ul>
  </div>
);

export default NavList;
