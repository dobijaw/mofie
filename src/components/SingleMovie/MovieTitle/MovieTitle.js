import React from 'react';
import styles from './MovieTitle.module.scss';

const MovieTitle = ({ lightTheme, title }) => (
  <h3 className={lightTheme ? styles.movieTitleLight : styles.movieTitle}>
    {title}
  </h3>
);

export default MovieTitle;
