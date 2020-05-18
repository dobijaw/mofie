import React from 'react';
import Navigation from 'components/Navigation/Navigation';
import styles from './MainTemplate.module.scss';

const MainTemplate = ({ children }) => (
  <div className={styles.wrapper}>
    <Navigation />
    <div className={styles.wrapperInside}>{children}</div>
  </div>
);

export default MainTemplate;
