import React from 'react';
import styles from './MovieDescription.module.scss';

const MovieDescription = ({ lightTheme, description }) => (
  <p className={lightTheme ? styles.descriptionLight : styles.description}>
    {description}
  </p>
);

export default MovieDescription;
