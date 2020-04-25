import React from 'react';
import styles from './MovieGenres.module.scss';
import MovieGenresItem from './MovieGenresItem/MovieGenresItem';

const MovieGenres = ({ light, genres }) => {
  return (
    <ul className={light ? styles.movieGenresLight : styles.movieGenres}>
      {genres.map(item => (
        <MovieGenresItem key={item} genre={item} />
      ))}
    </ul>
  );
};

export default MovieGenres;
