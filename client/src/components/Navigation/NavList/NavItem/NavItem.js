import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';

const NavItem = ({ name, link, asPrimary }) => (
  <li className={styles.navItem}>
    <NavLink
      activeClassName={styles.navItemLinkActive}
      className={`${styles.navItemLink} ${
        asPrimary && styles.navItemLinkPrimary
      }`}
      to={link}
    >
      {name}
    </NavLink>
  </li>
);

export default NavItem;
