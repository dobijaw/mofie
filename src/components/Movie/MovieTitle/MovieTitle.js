import React from 'react';
import styles from './MovieTitle.module.scss';

const MovieTitle = ({ light, title }) => (
  <h3 className={light ? styles.movieTitleLight : styles.movieTitle}>
    {title}
  </h3>
);

export default MovieTitle;
