import React from 'react';
import styles from './MovieGenresItem.module.scss';

const MovieGenresItem = ({ genre }) => (
  <li className={styles.movieGenresItem}>{genre}</li>
);

export default MovieGenresItem;
