import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tagline.module.scss';

const Tagline = ({ children }) => (
  <>{children && <p className={styles.tagline}>{children}</p>}</>
);

Tagline.propTypes = {
  children: PropTypes.string,
};

Tagline.defaultProps = {
  children: '',
};

export default Tagline;
