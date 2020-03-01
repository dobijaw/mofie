import React from 'react';
import styles from './MoviePoster.module.scss';

const MoviePoster = ({ img }) => (
  <div className={styles.moviePosterContainer}>
    <img className={styles.moviePosterImg} src={img} alt="Cover" />
  </div>
);

export default MoviePoster;
