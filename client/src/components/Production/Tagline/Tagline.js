import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tagline.module.scss';

const Tagline = ({ children, lightTheme }) => (
  <>
    {children && (
      <p className={lightTheme ? styles.taglineLight : styles.tagline}>
        {children}
      </p>
    )}
  </>
);

Tagline.propTypes = {
  children: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
};

Tagline.defaultProps = {
  lightTheme: false,
};

export default Tagline;
