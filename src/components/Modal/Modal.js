import React from 'react';
import styles from './Modal.module.scss';
import MovieYear from '../Movie/MovieYear/MovieYear';
import MovieTitle from '../Movie/MovieTitle/MovieTitle';
import MovieGenres from '../Movie/MovieGenres/MovieGenres';
import MovieDescription from '../Movie/MovieDescription/MovieDescription';
import Button from '../Button/Button';

const Modal = () => (
  <div className={styles.modal}>
    <MovieYear year="2019" />
    <MovieTitle light title="The Rise of Skywalker" />
    <MovieGenres light genres={['SciFi', 'Fantasy', 'Thriller', 'Comedy']} />
    <MovieDescription
      light
      description="The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end."
    />
    <Button light text="+ add to collection" />
  </div>
);

export default Modal;
