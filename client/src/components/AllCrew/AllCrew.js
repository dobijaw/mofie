import React from 'react';
import SubHeadline from 'components/SubHeadline/SubHeadline';
import Crew from 'components/Production/Crew/Crew';
import styles from './AllCrew.module.scss';

const AllCrew = ({ crew }) => (
  <section className={styles.allCrew}>
    <SubHeadline>Crew</SubHeadline>
    <Crew crew={crew} />
  </section>
);

export default AllCrew;
