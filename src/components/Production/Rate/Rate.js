import React from 'react';
import PropTypes from 'prop-types';
import styles from './Rate.module.scss';

const Rate = ({ children }) => <span className={styles.rate}>{children}</span>;

Rate.propTypes = {
  children: PropTypes.isRequired,
};

export default Rate;
