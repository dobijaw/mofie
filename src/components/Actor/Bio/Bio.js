import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bio.module.scss';

const Bio = ({ children }) => <p className={styles.bio}>{children}</p>;

Bio.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Bio;
