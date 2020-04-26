import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieItem.module.scss';
import Button from '../../Button/Button';
import MoviePoster from '../../SingleMovie/MoviePoster/MoviePoster';
import MovieYear from '../../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../../SingleMovie/MovieGenres/MovieGenres';
import AppContext from '../../../context';

const MovieItem = ({ img, title, year, genres, id, type, productionType }) => {
  return (
    <AppContext.Consumer>
      {(context) => (
        <li className={styles.movieItem}>
          <Link className={styles.movieItemLink} to={`${productionType}/${id}`}>
            <MoviePoster img={img} asBackground />

            <div className={styles.movieItemDetails}>
              <MovieYear year={year} />
              <MovieTitle title={title} />
              <MovieGenres genres={genres} />
            </div>
          </Link>
          <div className={styles.movieItemBtn}>
            <Button
              id={id}
              handleClick={context.handleOpenModal}
              type={type}
              additionalClass={styles.movieItemSingleBtn}
            >
              +
            </Button>
          </div>
        </li>
      )}
    </AppContext.Consumer>
  );
};
export default MovieItem;
