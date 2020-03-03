import React, { useState, useEffect } from 'react';
import Title from '../../components/Title/Title';
import styles from './NowPlaying.module.scss';
import MovieList from '../../components/MovieList/MovieList';
import collection from '../../assets/demo/collection';

const newCollection = collection.map(single => {
  return {
    id: single.movie.id,
    img: single.movie.img,
    year: single.movie.year,
    title: single.movie.title,
    genres: single.movie.genres,
  };
});

const NowPlaying = () => {
  const [movies, getMovies] = useState([]);

  useEffect(() => {
    getMovies(newCollection);
  }, []);

  return (
    <div className={styles.nowPlayingWrapper}>
      <Title headline="Now playing" isHidden />

      <div className={styles.nowPlayingMovies}>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default NowPlaying;
