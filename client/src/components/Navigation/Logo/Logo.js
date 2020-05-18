import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'assets/img/mofie.svg';
import logoWhite from 'assets/img/mofieWhite.svg';

import styles from './Logo.module.scss';

const Logo = ({ isMiddle, isWhite }) => (
  <div
    className={isMiddle ? `${styles.logo} ${styles.logoMiddle}` : styles.logo}
  >
    <NavLink className={styles.logoLink} to="/">
      <img
        src={isWhite ? logoWhite : logo}
        alt="Mofie"
        className={styles.logoImg}
      />
    </NavLink>
  </div>
);

export default Logo;
