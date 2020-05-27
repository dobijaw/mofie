import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation/Navigation';
import styles from './MainTemplate.module.scss';

const MainTemplate = ({ children }) => (
  <div className={styles.wrapper}>
    <Navigation />
    <main className={styles.wrapperInside}>{children}</main>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
