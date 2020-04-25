import React, { useState, useEffect } from 'react';
import styles from './SingleMovieView.module.scss';
// import collection from '../../assets/demo/collection';
import MovieYear from '../../components/SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../../components/SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../../components/SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../../components/SingleMovie/MovieDescription/MovieDescription';
import Comments from '../../components/Comments/Comments';
import MoviePoster from '../../components/SingleMovie/MoviePoster/MoviePoster';

const SingleMovieView = props => {
  const { id, type } = props.match.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const productionType = type === 'movies' ? 'movie' : 'tv';

    fetch(
      `https://api.themoviedb.org/3/${productionType}/${id}?api_key=f0881d0904275b8ecded5ddeaa83fe30&language=en-US`,
    )
      .then(res => res.json())
      .then(res => {
        setMovie({
          ...movie,
          title: type === 'movies' ? res.title : res.original_name,
          posterPath: `http://image.tmdb.org/t/p/w500/${res.poster_path}`,
          description: res.overview,
          genres: res.genres.map(g => g.name),
          year: res.release_date,
        });
      });
  }, []);
  return (
    <>
      <section className={styles.movieWrapper}>
        <div className={styles.movieWrapperItem}>
          <MoviePoster img={movie.posterPath} poster />
        </div>
        <div className={styles.movieWrapperItem}>
          <MovieYear year={movie.year} />
          {/* <MovieTitle title={collection[0].title} /> */}
          <MovieTitle title={movie.title} />
          {movie.genres < 0 && <MovieGenres genres={movie.genres} />}
          <MovieDescription description={movie.description} />
        </div>
      </section>
      <Comments />
    </>
  );
};

export default SingleMovieView;
