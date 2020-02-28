import React from 'react';
import Title from '../../components/Title/Title';
import MovieGroup from '../../components/MovieGroup/MovieGroup';

import styles from './NewsView.module.scss';

const NewsView = () => (
  <>
    <Title headline="Now playing" />

    <div className={styles.wrapper}>
      <MovieGroup title="Movies" />
      <MovieGroup title="Shows" />
    </div>
  </>
);

export default NewsView;
