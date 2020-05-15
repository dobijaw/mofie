import React from 'react';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children, isHidden }) => (
  <h1 className={isHidden ? styles.isHidden : styles.title}>{children}</h1>
);

export default PageTitle;
