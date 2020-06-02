import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';

const NavItem = ({ name, link, asPrimary }) => (
  <li className={styles.navItem}>
    <NavLink
      activeClassName={styles.navItem_link___active}
      className={[styles.navItem_link, asPrimary && styles.navItem_link___primary].join(' ')}
      to={link}
    >
      {name}
    </NavLink>
  </li>
);

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  asPrimary: PropTypes.bool,
};

NavItem.defaultProps = {
  asPrimary: false,
};

export default NavItem;
