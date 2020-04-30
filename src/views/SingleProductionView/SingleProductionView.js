import React from 'react';
import { useFetch } from 'hooks';
import styles from './SingleProductionView.module.scss';
import MovieYear from '../../components/SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../../components/SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../../components/SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../../components/SingleMovie/MovieDescription/MovieDescription';
import Comments from '../../components/Comments/Comments';
import MoviePoster from '../../components/SingleMovie/MoviePoster/MoviePoster';

const SingleMovieView = (props) => {
  const { id, type } = props.match.params;

  const [data, error, loading] = useFetch(
    `https://api.themoviedb.org/3/${
      type === 'movies' ? 'movie' : 'tv'
    }/${id}?api_key=f0881d0904275b8ecded5ddeaa83fe30&language=en-US`,
  );

  return (
    <>
      {error && 'Something went wrong!'}
      {loading ? (
        'Is loading'
      ) : (
        <>
          <section className={styles.movieWrapper}>
            <div className={styles.movieWrapperItem}>
              <MoviePoster
                img={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
                poster
              />
            </div>
            <div className={styles.movieWrapperItem}>
              <MovieYear
                year={
                  type === 'movies' ? data.release_date : data.first_air_date
                }
              />
              <MovieTitle
                title={type === 'movies' ? data.original_title : data.name}
              />
              <MovieGenres genres={data.genres.map((i) => i.name)} />
              <MovieDescription description={data.overview} />
              {data.adult && 'Only for Adults!'}
            </div>
          </section>
          <Comments />
        </>
      )}
    </>
  );
};

export default SingleMovieView;
