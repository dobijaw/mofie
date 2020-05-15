import React from 'react';
import styles from './Headline.module.scss';

const Headline = ({ tag: Tag, children, additionalClass }) => {
  return (
    <Tag className={`${styles.headline} ${additionalClass}`}>{children}</Tag>
  );
};

export default Headline;
