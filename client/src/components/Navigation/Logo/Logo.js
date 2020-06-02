import React from 'react';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logoWhite from 'assets/img/mofieWhite.svg';
import logo from 'assets/img/mofie.svg';
import styles from './Logo.module.scss';

const Logo = ({ isMiddle, isWhite }) => (
  <div className={[styles.logo, isMiddle && styles.logo___middle].join(' ')}>
    <NavLink className={styles.logo_link} to={routes.home}>
      <img src={isWhite ? logoWhite : logo} alt="Mofie" className={styles.logo_img} />
    </NavLink>
  </div>
);

Logo.propTypes = {
  isMiddle: PropTypes.bool,
  isWhite: PropTypes.bool,
};

Logo.defaultProps = {
  isMiddle: false,
  isWhite: false,
};

export default Logo;
