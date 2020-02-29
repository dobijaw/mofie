import React from 'react';
import styles from './MovieDescription.module.scss';

const MovieDescription = ({ light, description }) => (
  <p className={light ? styles.descriptionLight : styles.description}>
    {description}
  </p>
);

export default MovieDescription;
