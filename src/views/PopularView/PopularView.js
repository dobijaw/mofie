import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from 'hooks';
import API_KEY from 'config';
import Title from 'components/Title/Title';
import Headline from 'components/Headline/Headline';
import MovieList from 'components/MovieList/MovieList';
import AppContext from 'context';
import styles from './PopularView.module.scss';

const NowPlaying = () => {
  const context = useContext(AppContext);
  const [movies, getMovies] = useState([]);
  const [shows, getShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  const [moviesRes] = useFetch(popularMoviesURL);
  const [showsRes] = useFetch(popularShowsURL);

  useEffect(() => {
    if (moviesRes !== null && showsRes !== null) {
      const total = Math.min(++moviesRes.total_pages, ++showsRes.total_pages);
      setTotalPages(total);
    }
  }, [moviesRes, showsRes]);

  useEffect(() => {
    if (moviesRes !== null && context.movieGenres !== null) {
      const data = moviesRes.results.map((movie) => ({
        id: movie.id,
        img:
          movie.backdrop_path &&
          `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        year: movie.release_date,
        title: movie.title,
        genres: context.movieGenres.genres
          .filter((i) => movie.genre_ids.includes(i.id))
          .map((i) => i.name),
        type: 'movie',
      }));

      getMovies(data);
    }
  }, [moviesRes, context]);

  useEffect(() => {
    if (showsRes !== null && context.showGenres !== null) {
      const data = showsRes.results.map((show) => ({
        id: show.id,
        img:
          show.backdrop_path &&
          `http://image.tmdb.org/t/p/w500/${show.backdrop_path}`,
        year: show.first_air_date,
        title: show.name,
        genres: context.showGenres.genres
          .filter((i) => show.genre_ids.includes(i.id))
          .map((i) => i.name),
        type: 'shows',
      }));

      getShows(data);
    }
  }, [showsRes, context]);

  return (
    <div className={styles.nowPlayingWrapper}>
      <Title headline="Popular" isHidden />

      <div className={styles.nowPlayingMovies}>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" additionalClass={styles.popularHeadline}>
            Popular movies
          </Headline>
          <MovieList
            movies={movies}
            type="movies"
            additionalClass={styles.popularList}
          />
        </section>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" additionalClass={styles.popularHeadline}>
            Popular TV shows
          </Headline>
          <MovieList
            movies={shows}
            type="shows"
            additionalClass={styles.popularList}
          />
        </section>
      </div>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        type="button"
        disabled={currentPage <= 1}
      >
        prev
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        type="button"
        disabled={currentPage >= totalPages}
      >
        next
      </button>
    </div>
  );
};

export default NowPlaying;
