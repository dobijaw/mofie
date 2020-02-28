import React from 'react';
import styles from './MovieGenres.module.scss';
import MovieGenresItem from './MovieGenresItem/MovieGenresItem';

const MovieGenres = ({ genres }) => (
  <ul className={styles.movieGenres}>
    {genres.map(item => (
      <MovieGenresItem key={item} genre={item} />
    ))}
  </ul>
);

export default MovieGenres;
