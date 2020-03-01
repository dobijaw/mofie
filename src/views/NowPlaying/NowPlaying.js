import React, { useState, useEffect } from 'react';
import API_KEY from '../../config/config';
import Title from '../../components/Title/Title';
import styles from './NowPlaying.module.scss';
import MovieList from '../../components/MovieList/MovieList';

const NowPlaying = ({ genresMovie }) => {
  // eslint-disable-next-line
  const [hasError, setErrors] = useState(false);
  const [movies, getMovies] = useState([]);

  const fetchData = async () => {
    const link = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await fetch(link);
    await response
      .json()
      .then(resp => resp.results)
      .then(resp =>
        resp.map(item => {
          // eslint-disable-next-line
          const newGenres = item.genre_ids.map(el => {
            for (let i = 0; i < genresMovie.length; i++) {
              if (el.toString() === genresMovie[i].id.toString())
                return genresMovie[i].name;
            }
          });

          return {
            id: item.id,
            img: `http://image.tmdb.org/t/p/w780/${item.backdrop_path}`,
            year: item.release_date,
            title: item.title,
            genres: newGenres,
          };
        }),
      )
      .then(resp => getMovies(resp))
      .catch(err => setErrors(err));
  };

  useEffect(() => {
    fetchData();
  });

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
