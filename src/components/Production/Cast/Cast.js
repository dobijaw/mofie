import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cast.module.scss';

const Cast = ({ cast }) => (
  <ul className={styles.cast}>
    {cast.map((i) => (
      <li key={i.id} className={styles.castItem}>
        <div
          className={styles.castAvatar}
          style={{
            backgroundImage: i.avatar && `url(${i.avatar})`,
          }}
        />
        <h2 className={styles.castName}>{i.name}</h2>
        <span className={styles.castCharacter}>{i.character}</span>
      </li>
    ))}
  </ul>
);

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

export default Cast;
