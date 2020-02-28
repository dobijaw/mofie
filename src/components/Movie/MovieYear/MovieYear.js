import React from 'react';
import styles from './MovieYear.module.scss';

const MovieYear = ({ year }) => (
  <span className={styles.movieYear}>{year}</span>
);

export default MovieYear;
