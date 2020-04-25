import React from 'react';
import AppContext from 'context';
import styles from './MovieList.module.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({ movies, type }) => (
  <AppContext.Consumer>
    {(context) => (
      <ul className={styles.wrapper}>
        {movies.map((item) => (
          <MovieItem
            productionType={type}
            key={item.title}
            {...item}
            genresName={context.genres}
          />
        ))}
      </ul>
    )}
  </AppContext.Consumer>
);

export default MovieList;
