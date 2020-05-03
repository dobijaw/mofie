import React from 'react';
import styles from './MainCrew.module.scss';

const MainCrew = ({ crew }) => (
  <ul className={styles.mainCrew}>
    {crew.map((i) => (
      <li key={i.id} className={styles.mainCrewItem}>
        <span className={styles.mainCrewJob}>{i.job}: </span>
        <span className={styles.mainCrewName}>{i.name}</span>
      </li>
    ))}
  </ul>
);

export default MainCrew;
