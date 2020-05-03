import React from 'react';
import styles from './Genres.module.scss';
import GenresItem from './GenresItem/GenresItem';

const Genres = ({ lightTheme, genres }) => {
  return (
    <ul className={lightTheme ? styles.movieGenresLight : styles.movieGenres}>
      {genres.map((item) => (
        <GenresItem key={item} genre={item} />
      ))}
    </ul>
  );
};

export default Genres;
