import React from 'react';
import styles from './MovieGroup.module.scss';

import MovieItem from '../MovieListWrapper/MovieItem/MovieItem';

const MovieGroup = ({ title, movies }) => (
  <section className={styles.group}>
    <h2 className={styles.groupTitle}>{title}</h2>
    <div>
      {movies.map(item => (
        <MovieItem
          year={item.release_date}
          title={item.title}
          genres={item.genre_ids}
          img={`http://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
        />
      ))}
    </div>
  </section>
);

export default MovieGroup;
