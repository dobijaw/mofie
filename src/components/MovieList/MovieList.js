import React from 'react';
import styles from './MovieList.module.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({ movies, type }) => (
  <ul className={styles.wrapper}>
    {movies.map(item => (
      <MovieItem productionType={type} key={item.title} {...item} />
    ))}
  </ul>
);

export default MovieList;
