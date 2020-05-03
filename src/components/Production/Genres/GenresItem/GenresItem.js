import React from 'react';
import styles from './GenresItem.module.scss';

const GenresItem = ({ genre }) => (
  <li className={styles.movieGenresItem}>{genre}</li>
);

export default GenresItem;
