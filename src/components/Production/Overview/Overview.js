import React from 'react';
import styles from './Overview.module.scss';

const Description = ({ lightTheme, description }) => (
  <p className={lightTheme ? styles.descriptionLight : styles.description}>
    {description}
  </p>
);

export default Description;
