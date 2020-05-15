import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/mofie.svg';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <NavLink className={styles.logoLink} to="/">
      <img src={logo} alt="Mofie" className={styles.logoImg} />
    </NavLink>
  </div>
);

export default Logo;
