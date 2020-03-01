import React from 'react';
import styles from './MovieList.module.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({ movies }) => (
  <ul className={styles.wrapper}>
    {movies.map(item => (
      <MovieItem key={item.title} {...item} />
    ))}
  </ul>
);

export default MovieList;
