import React from 'react';
import styles from './Poster.module.scss';

const Poster = ({ img, poster, asBackground }) => (
  <>
    {asBackground ? (
      <div
        className={styles.moviePosterBackground}
        style={{ backgroundImage: `url(${img})` }}
      />
    ) : (
      <div
        className={
          poster
            ? styles.moviePosterContainerPoster
            : styles.moviePosterContainer
        }
      >
        <img className={styles.moviePosterImg} src={img} alt="Cover" />
      </div>
    )}
  </>
);

export default Poster;
