import React, { useState, useEffect } from 'react';
import API_KEY from 'config';
import styles from './Modal.module.scss';
import MovieYear from '../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../SingleMovie/MovieGenres/MovieGenres';
// import MovieGenresItem from '../SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../SingleMovie/MovieDescription/MovieDescription';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const [movieDetails, getMovieDetails] = useState({});
  const [mygen, semygen] = useState([]);

  const fetchDatMovieDetails = async (link, signal) => {
    const response = await fetch(link, { signal });
    await response
      .json()
      .then((resp) => {
        getMovieDetails(resp);
        return resp.genres;
      })
      .then((genres) => {
        semygen(genres.map((el) => el.name));
      });
  };

  useEffect(() => {
    const abortController = new window.AbortController();
    const { signal } = abortController;

    if (selected.type === 'movie') {
      fetchDatMovieDetails(
        `https://api.themoviedb.org/3/movie/${selected.id}?api_key=${API_KEY}&language=en-US`,
        signal,
      );
    } else {
      fetchDatMovieDetails(
        `https://api.themoviedb.org/3/tv/${selected.id}?api_key=${API_KEY}&language=en-US`,
        signal,
      );
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [selected]);

  return (
    <div className={styles.modal}>
      <Close />
      <MovieYear
        year={
          selected.type === 'movie'
            ? movieDetails.release_date
            : movieDetails.first_air_date
        }
      />
      <MovieTitle
        light
        title={
          selected.type === 'movie' ? movieDetails.title : movieDetails.name
        }
      />
      <MovieGenres light genres={mygen} />
      {/* {mygen.map(el => (
        <span key={el}>{el}</span>
      ))} */}
      <MovieDescription light description={movieDetails.overview} />
      <Button light>+ add to collection</Button>
    </div>
  );
};

export default Modal;
