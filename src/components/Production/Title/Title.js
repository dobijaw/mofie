import React from 'react';
import styles from './Title.module.scss';

const Title = ({ lightTheme, title }) => (
  <h3 className={lightTheme ? styles.movieTitleLight : styles.movieTitle}>
    {title}
  </h3>
);

export default Title;
