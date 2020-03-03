import React, { useState } from 'react';
import styles from './Modal.module.scss';
import MovieYear from '../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../SingleMovie/MovieDescription/MovieDescription';
import Button from '../Button/Button';
import collection from '../../assets/demo/collection';
import Close from './Close/Close';

const Modal = ({ id }) => {
  const [movie] = useState(collection.find(item => +item.id === +id));

  return (
    <div className={styles.modal}>
      <Close />
      <MovieYear year={movie.year} />
      <MovieTitle light title={movie.title} />
      <MovieGenres light genres={movie.genres} />
      <MovieDescription light description={movie.description} />
      <Button light text="+ add to collection" />
    </div>
  );
};

export default Modal;
