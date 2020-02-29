import React from 'react';
import styles from './NavList.module.scss';
import NavItem from './NavItem/NavItem';

const NavList = ({ isOpen }) => (
  <div className={isOpen ? styles.navListActive : styles.navList}>
    <ul className={styles.navListItem}>
      <NavItem name="Collection" link="/my-collection" />
      <NavItem name="Find show" link="/find-show" />
      <NavItem name="Find Movie" link="/find-movie" />
    </ul>
  </div>
);

export default NavList;
