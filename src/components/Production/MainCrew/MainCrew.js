import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainCrew.module.scss';

const MainCrew = ({ crew }) => (
  <ul className={styles.mainCrew}>
    {crew.map((c) => (
      <li key={c.id} className={styles.mainCrewItem}>
        <span className={styles.mainCrewJob}>{c.job}: </span>
        <span className={styles.mainCrewName}>{c.name}</span>
      </li>
    ))}
  </ul>
);

MainCrew.propTypes = {
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      job: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default MainCrew;
