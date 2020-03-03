import React from 'react';
import styles from './MoviePoster.module.scss';

const MoviePoster = ({ img, poster }) => (
  <div
    className={
      poster ? styles.moviePosterContainerPoster : styles.moviePosterContainer
    }
  >
    <img className={styles.moviePosterImg} src={img} alt="Cover" />
  </div>
);

export default MoviePoster;
