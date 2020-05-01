import React, { useContext } from 'react';
import { RootContext } from 'context';
import styles from './MovieList.module.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({ movies, type, additionalClass }) => {
  const context = useContext(RootContext);

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
