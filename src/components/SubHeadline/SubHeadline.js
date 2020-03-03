import React from 'react';
import styles from './SubHeadline.module.scss';

const SubHeadline = ({ headline }) => (
  <div className={styles.subHeadlineWrapper}>
    <h2 className={styles.subHeadlineText}>{headline}</h2>
  </div>
);

export default SubHeadline;
