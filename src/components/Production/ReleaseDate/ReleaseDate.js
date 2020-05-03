import React from 'react';
import styles from './ReleaseDate.module.scss';

const ReleaseDate = ({ year }) => (
  <span className={styles.movieYear}>{year}</span>
);

export default ReleaseDate;
