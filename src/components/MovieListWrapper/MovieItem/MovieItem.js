import React from 'react';
import styles from './MovieItem.module.scss';
import Button from '../../Button/Button';
import MovieYear from '../../Movie/MovieYear/MovieYear';
import MovieTitle from '../../Movie/MovieTitle/MovieTitle';
import MovieGenres from '../../Movie/MovieGenres/MovieGenres';

const MovieItem = () => {
  return (
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
          <MovieYear year="2019" />
          <MovieTitle title="Star Wars: The Rise of Skywalker." />
          <MovieGenres genres={['sci fi', 'fantasy']} />
        </div>
        <div className={styles.movieItemBtns}>
          <Button text="more" />
          <Button text="+ add to collection" />
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
