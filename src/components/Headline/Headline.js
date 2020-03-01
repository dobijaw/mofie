import React from 'react';
import styles from './Headline.module.scss';

const Headline = ({ tag: Tag, headline }) => {
  return <Tag className={styles.headline}>{headline}</Tag>;
};

export default Headline;
