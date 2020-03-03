import React from 'react';
import styles from './SingleMovieView.module.scss';
import collection from '../../assets/demo/collection';
import MovieYear from '../../components/SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../../components/SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../../components/SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../../components/SingleMovie/MovieDescription/MovieDescription';
import Comments from '../../components/Comments/Comments';
import MoviePoster from '../../components/SingleMovie/MoviePoster/MoviePoster';

const SingleMovieView = () => {
  return (
    <>
      <section className={styles.movieWrapper}>
        <div className={styles.movieWrapperItem}>
          <MoviePoster img={collection[0].poster} poster />
        </div>
        <div className={styles.movieWrapperItem}>
          <MovieYear year={collection[0].year} />
          <MovieTitle title={collection[0].title} />
          <MovieGenres genres={collection[0].genres} />
          <MovieDescription description={collection[0].description} />
        </div>
      </section>
      <Comments />
    </>
  );
};

export default SingleMovieView;
