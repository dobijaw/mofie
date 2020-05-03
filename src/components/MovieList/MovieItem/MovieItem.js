import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RootContext } from 'context';
import styles from './MovieItem.module.scss';
import Button from '../../Button/Button';
import MoviePoster from '../../SingleMovie/MoviePoster/MoviePoster';
import MovieYear from '../../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../../SingleMovie/MovieGenres/MovieGenres';

const MovieItem = ({ img, title, year, genres, id, type, productionType }) => {
  return (
    <RootContext.Consumer>
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
    </RootContext.Consumer>
  );
};

MovieItem.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default MovieItem;
