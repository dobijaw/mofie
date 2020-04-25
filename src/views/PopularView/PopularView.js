import React, { useState, useEffect } from 'react';
import styles from './PopularView.module.scss';
import API_KEY from '../../config/config';
import Title from '../../components/Title/Title';
import Headline from '../../components/Headline/Headline';
import MovieList from '../../components/MovieList/MovieList';

const NowPlaying = () => {
  const [movies, getMovies] = useState([]);
  const [shows, getShows] = useState([]);
  const [currentPage] = useState(1);

  const fetchDataMovies = async (link, signal, updateState) => {
    const response = await fetch(link, { signal });

    await response
      .json()
      .then(resp => resp.results)
      .then(resp =>
        resp.map(el => {
          return {
            id: el.id,
            img:
              el.backdrop_path &&
              `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
            year: el.release_date,
            title: el.title,
            genres: el.genre_ids,
            type: 'movie',
          };
        }),
      )
      .then(resp => {
        updateState(resp);
      });
  };

  const fetchDataShows = async (link, signal, updateState) => {
    const response = await fetch(link, { signal });

    await response
      .json()
      .then(resp => resp.results)
      .then(resp =>
        resp.map(el => {
          return {
            id: el.id,
            img:
              el.backdrop_path &&
              `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
            year: el.first_air_date,
            title: el.name,
            genres: el.genre_ids,
            type: 'shows',
          };
        }),
      )
      .then(resp => {
        updateState(resp);
      });
  };

  useEffect(() => {
    const abortController = new window.AbortController();
    const { signal } = abortController;

    fetchDataMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
      signal,
      getMovies,
    );

    fetchDataShows(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
      signal,
      getShows,
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [currentPage]);

  return (
    <div className={styles.nowPlayingWrapper}>
      <Title headline="Popular" isHidden />

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
