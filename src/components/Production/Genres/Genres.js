import React from 'react';
import PropTypes from 'prop-types';
import styles from './Genres.module.scss';

const Genres = ({ genres, lightTheme }) => {
  return (
    <ul className={lightTheme ? styles.genresLight : styles.genres}>
      {genres.map((item) => (
        <li key={item} className={styles.genresItem}>
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
