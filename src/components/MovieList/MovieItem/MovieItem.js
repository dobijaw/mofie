import React from 'react';
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
          <MoviePoster img={img} />

          <div className={styles.movieItemDetails}>
            <MovieYear year={year} />
            <MovieTitle title={title} />
            <MovieGenres genres={genres} />
          </div>

          <div className={styles.movieItemBtns}>
            <Button to={`${productionType}/${id}`} id={id} text="more" />
            <Button
              id={id}
              text="+ add to collection"
              handleClick={context.handleOpenModal}
              type={type}
            />
          </div>
        </li>
      )}
    </AppContext.Consumer>
  );
};
export default MovieItem;
