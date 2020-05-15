import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.scss';

const Title = ({ children, lightTheme }) => (
  <h3 className={lightTheme ? styles.titleLight : styles.title}>{children}</h3>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
};

Title.defaultProps = {
  lightTheme: false,
};

export default Title;
