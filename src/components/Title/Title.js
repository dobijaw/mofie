import React from 'react';
import styles from './Title.module.scss';

const Title = ({ isHidden, children }) => (
  <h1 className={isHidden ? styles.isHidden : styles.title}>{children}</h1>
);

export default Title;
