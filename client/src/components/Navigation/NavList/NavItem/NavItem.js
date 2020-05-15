import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';

const NavItem = ({ name, link }) => (
  <li className={styles.navItem}>
    <NavLink
      activeClassName={styles.navItemLinkActive}
      className={styles.navItemLink}
      to={link}
    >
      {name}
    </NavLink>
  </li>
);

export default NavItem;
