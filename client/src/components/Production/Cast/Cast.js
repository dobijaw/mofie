import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from 'assets/img/avatar.svg';
import { Link } from 'react-router-dom';
import styles from './Cast.module.scss';

const Cast = ({ cast }) => (
  <ul className={styles.cast}>
    {cast.map((c) => (
      <li key={c.id} className={styles.castItem}>
        <Link to={`/actor/${c.id}`} className={styles.castLink}>
          <div
            className={c.avatar ? styles.castAvatar : styles.castAvatarDefault}
            style={{
              backgroundImage: `url(${c.avatar || defaultAvatar})`,
            }}
          />
          <h3 className={styles.castName}>{c.name}</h3>
          <span className={styles.castCharacter}>{c.character}</span>
        </Link>
      </li>
    ))}
  </ul>
);

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      creditID: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

export default Cast;
