import React from 'react';
import styles from './MovieGroup.module.scss';
import MovieListWrapper from '../MovieListWrapper/MovieListWrapper';

const MovieGroup = ({ title }) => (
  <section className={styles.group}>
    <h2 className={styles.groupTitle}>{title}</h2>
    <div>
      <MovieListWrapper />
    </div>
  </section>
);

export default MovieGroup;
