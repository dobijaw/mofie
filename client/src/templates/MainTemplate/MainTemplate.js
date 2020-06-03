import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import styles from './MainTemplate.module.scss';

const MainTemplate = ({ children, footerSpace }) => (
  <div className={styles.mainTemplate}>
    <div
      className={[
        styles.mainTemplate_wrapper,
        footerSpace && styles.mainTemplate_wrapper___footerSpace,
      ].join(' ')}
    >
      <Navigation />
      <main className={styles.mainTemplate_body}>{children}</main>
    </div>
    <Footer />
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  footerSpace: PropTypes.bool,
};

MainTemplate.defaultProps = {
  footerSpace: false,
};

export default MainTemplate;
