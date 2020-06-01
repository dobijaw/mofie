import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import styles from './MainTemplate.module.scss';

const MainTemplate = ({ children }) => (
  <div className={styles.mainTemplate}>
    <div className={styles.mainTemplate_wrapper}>
      <Navigation />
      <main className={styles.mainTemplate_body}>{children}</main>
    </div>
    <Footer />
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
