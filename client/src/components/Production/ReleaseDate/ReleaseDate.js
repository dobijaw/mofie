import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReleaseDate.module.scss';

const ReleaseDate = ({ children }) => (
  <span className={styles.releaseDate}>{children}</span>
);

ReleaseDate.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ReleaseDate;
