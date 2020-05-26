import React from 'react';
import PropTypes from 'prop-types';
import Position from '../Position/Position';
import styles from './Crew.module.scss';

const Crew = ({ crew, isMain }) => (
  <ul
    className={
      isMain
        ? [styles.crew, styles.crew___main].join(' ')
        : [styles.crew, styles.crew___all].join(' ')
    }
  >
    {crew.map((c) => (
      <li key={c.id} className={styles.crew_item}>
        <Position job={c.job} name={c.name} isMain={isMain} />
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
  isMain: PropTypes.bool,
};

Crew.defaultProps = {
  isMain: false,
};

export default Crew;
