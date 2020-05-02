import React from 'react';
import { useFetch } from 'hooks';
import { withRouter } from 'react-router';
import MovieYear from 'components/SingleMovie/MovieYear/MovieYear';
import MovieTitle from 'components/SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from 'components/SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from 'components/SingleMovie/MovieDescription/MovieDescription';
import Comments from 'components/Comments/Comments';
import MoviePoster from 'components/SingleMovie/MoviePoster/MoviePoster';
import styles from './SingleProductionView.module.scss';

const SingleMovieView = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
  } = props;

  const context = pathname.includes('movies') ? 'movie' : 'tv';
  const productionURL = `https://api.themoviedb.org/3/${context}/${id}?api_key=f0881d0904275b8ecded5ddeaa83fe30&language=en-US`;

  const [data, error, loading] = useFetch(productionURL);

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
                  context === 'movie' ? data.release_date : data.first_air_date
                }
              />
              <MovieTitle
                title={context === 'movie' ? data.original_title : data.name}
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

export default withRouter(SingleMovieView);
