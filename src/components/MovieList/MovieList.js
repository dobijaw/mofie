import React, { useContext } from 'react';
import AppContext from 'context';
import styles from './MovieList.module.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({ movies, type, additionalClass }) => {
  const context = useContext(AppContext);

  return (
    <ul className={`${styles.wrapper} ${additionalClass}`}>
      {movies.map((item) => (
        <MovieItem
          productionType={type}
          key={item.title}
          {...item}
          genresName={context.genres}
        />
      ))}
    </ul>
  );
};

export default MovieList;
