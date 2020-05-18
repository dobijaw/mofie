import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterRoute.module.scss';

const FooterRoute = ({ copy, route, routeName }) => (
  <footer className={styles.footerRoute}>
    <span className={styles.footerRouteCopy}>{copy}</span>
    <Link to={route} className={styles.footerRouteLink}>
      {routeName}
    </Link>
  </footer>
);

export default FooterRoute;
