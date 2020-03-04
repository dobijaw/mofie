import React, { useState } from 'react';
import styles from './Modal.module.scss';
import MovieYear from '../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../SingleMovie/MovieDescription/MovieDescription';
import Button from '../Button/Button';
import collection from '../../assets/demo/collection';
import showCollection from '../../assets/demo/showCollection';
import Close from './Close/Close';

const Modal = ({ id }) => {
  const [movie] = useState(collection.find(item => +item.id === +id));
  const [show] = useState(showCollection.find(item => +item.id === +id));

  const element = movie || show;

  return (
    <div className={styles.modal}>
      <Close />
      <MovieYear year={element.year} />
      <MovieTitle light title={element.title} />
      <MovieGenres light genres={element.genres} />
      <MovieDescription light description={element.description} />
      <Button light text="+ add to collection" />
    </div>
  );
};

export default Modal;
