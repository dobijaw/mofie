import React from 'react';
import styles from './MovieTitle.module.scss';

const MovieTitle = ({ title }) => (
  <h3 className={styles.movieTitle}>{title}</h3>
);

export default MovieTitle;
