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
  // const [shows, getShows] = useState([]);
  const [shows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  // const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  const [moviesRes] = useFetch(popularMoviesURL);
  // const [showsRes, sowsErrors, showsLoading] = useFetch(popularShowsURL);

  useEffect(() => {
    if (moviesRes !== null && context.movieGenres !== null) {
      const movieGenres = context.movieGenres.genres;

      const data = moviesRes.results.map((movie) => ({
        id: movie.id,
        img:
          movie.backdrop_path &&
          `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        year: movie.release_date,
        title: movie.title,
        // genres: movie.genre_ids,
        genres: movieGenres
          .filter((i) => movie.genre_ids.includes(i.id))
          .map((i) => i.name),
        type: 'movie',
      }));

      getMovies(data);
    }
  }, [moviesRes, context]);

  // useEffect(() => {
  //   if (showsRes === null) return;

  //   const data = showsRes.results.map((show) => ({
  //     id: show.id,
  //     img:
  //       show.backdrop_path &&
  //       `http://image.tmdb.org/t/p/w500/${show.backdrop_path}`,
  //     year: show.first_air_date,
  //     title: show.name,
  //     genres: show.genre_ids,
  //     type: 'shows',
  //   }));

  //   getShows(data);
  // }, [showsRes]);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // const fetchDataMovies = async (link, signal, updateState) => {
  //   const response = await fetch(link, { signal });

  //   await response
  //     .json()
  //     .then((resp) => resp.results)
  //     .then((resp) =>
  //       resp.map((el) => {
  //         return {
  //           id: el.id,
  //           img:
  //             el.backdrop_path &&
  //             `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
  //           year: el.release_date,
  //           title: el.title,
  //           genres: el.genre_ids,
  //           type: 'movie',
  //         };
  //       }),
  //     )
  //     .then((resp) => {
  //       updateState(resp);
  //     });
  // };

  // const fetchDataShows = async (link, signal, updateState) => {
  //   const response = await fetch(link, { signal });

  //   await response
  //     .json()
  //     .then((resp) => resp.results)
  //     .then((resp) =>
  //       resp.map((el) => {
  //         return {
  //           id: el.id,
  //           img:
  //             el.backdrop_path &&
  //             `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
  //           year: el.first_air_date,
  //           title: el.name,
  //           genres: el.genre_ids,
  //           type: 'shows',
  //         };
  //       }),
  //     )
  //     .then((resp) => {
  //       updateState(resp);
  //     });
  // };

  // useEffect(() => {
  //   const abortController = new window.AbortController();
  //   const { signal } = abortController;

  //   fetchDataMovies(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
  //     signal,
  //     getMovies,
  //   );

  //   fetchDataShows(
  //     `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  //     signal,
  //     getShows,
  //   );

  //   return function cleanup() {
  //     abortController.abort();
  //   };
  // }, [currentPage]);

  return (
    <div className={styles.nowPlayingWrapper}>
      <Title headline="Popular" isHidden />
      <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>

      <div className={styles.nowPlayingMovies}>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" headline="Popular movies" />
          <MovieList movies={movies} type="movies" />
        </section>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" headline="Popular TV shows" />
          <MovieList movies={shows} type="shows" />
        </section>
      </div>
    </div>
  );
};

export default NowPlaying;
