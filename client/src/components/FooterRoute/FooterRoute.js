import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './FooterRoute.module.scss';

const FooterRoute = ({ copy, route, routeName }) => (
  <footer className={styles.footerRoute}>
    <span className={styles.footerRoute_copy}>{copy}</span>
    <Link to={route} className={styles.footerRoute_link}>
      {routeName}
    </Link>
  </footer>
);

FooterRoute.propTypes = {
  copy: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default FooterRoute;
