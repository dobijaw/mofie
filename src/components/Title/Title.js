import React from 'react';
import styles from './Title.module.scss';

const Title = ({ headline, isHidden }) => (
  <h1 className={isHidden ? styles.isHidden : styles.title}>{headline}</h1>
);

export default Title;
