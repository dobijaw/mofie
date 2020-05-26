import React from 'react';
import PropTypes from 'prop-types';
import styles from './Genres.module.scss';

const Genres = ({ genres, lightTheme }) => {
  return (
    <ul
      className={lightTheme ? [styles.genres, styles.genres___light].join(' ') : styles.genres}
    >
      {genres.map((item) => (
        <li key={item} className={styles.genres_item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  lightTheme: PropTypes.bool,
};

Genres.defaultProps = {
  lightTheme: false,
};

export default Genres;
