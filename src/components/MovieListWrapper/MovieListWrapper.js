import React from 'react';
import MovieItem from './MovieItem/MovieItem';
import styles from './MovieListWrapper.module.scss';

const MovieListWrapper = () => (
  <ul className={styles.wrapper}>
    <MovieItem />
    <MovieItem />
  </ul>
);

export default MovieListWrapper;
