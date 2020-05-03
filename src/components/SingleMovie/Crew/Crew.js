import React from 'react';
import PropTypes from 'prop-types';
import styles from './Crew.module.scss';

const Crew = ({ crew }) => (
  <ul className={styles.crew}>
    {crew.map((c) => (
      <li key={c.id} className={styles.crewItem}>
        <span className={styles.crewJob}>{c.job}:</span>
        <span className={styles.crewName}> {c.name}</span>
      </li>
    ))}
  </ul>
);

Crew.propTypes = {
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      job: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default Crew;
