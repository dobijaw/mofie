import React from 'react';
import styles from './MovieItem.module.scss';
import Button from '../Button/Button';

const MovieItem = () => (
  <div className={styles.movieItem}>
    <div className={styles.movieItemImgContainer}>
      <img
        className={styles.movieItemImg}
        src="https://image.ceneostatic.pl/data/products/82493060/i-star-wars-the-last-jedi-gwiezdne-wojny-ostatni-jedi-dvd.jpg"
        alt="Cover"
      />
    </div>

    <div className={styles.movieItemData}>
      <div className={styles.movieItemInfo}>
        <span className={styles.movieItemYear}>2019</span>
        <h3 className={styles.movieItemTitle}>Star Wars: Skywalker Odrodzenie</h3>
        <span className={styles.movieItemType}>SciFi | Fantasy</span>
      </div>
      <div className={styles.movieItemBtns}>
        <Button text="more" />
        <Button text="+ add to collection" />
      </div>
    </div>
  </div>
);

export default MovieItem;
