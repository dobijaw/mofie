import React, { useState, useEffect } from 'react';
import styles from './NowPlaying.module.scss';
import API_KEY from '../../config/config';
import Title from '../../components/Title/Title';
import Headline from '../../components/Headline/Headline';
import MovieList from '../../components/MovieList/MovieList';

const NowPlaying = () => {
  const [movies, getMovies] = useState([]);
  const [shows, getShows] = useState([]);

  const fetchDataMovies = async (link, signal, updateState) => {
    const response = await fetch(link, { signal });

    await response
      .json()
      .then(resp => resp.results)
      .then(resp =>
        resp.map(el => {
          return {
            id: el.id,
            img: `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
            year: el.release_date,
            title: el.title,
            genres: el.genre_ids,
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
            img: `http://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
            year: el.first_air_date,
            title: el.original_name,
            genres: el.genre_ids,
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
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
      signal,
      getMovies,
    );

    fetchDataShows(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
      signal,
      getShows,
    );

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className={styles.nowPlayingWrapper}>
      <Title headline="Now playing" isHidden />

      <div className={styles.nowPlayingMovies}>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" headline="Now playing mvoies" />
          <MovieList movies={movies} />
        </section>
        <section className={styles.nowPlayingSection}>
          <Headline tag="h2" headline="Airing today shows" />
          <MovieList movies={shows} />
        </section>
      </div>
    </div>
  );
};

export default NowPlaying;
