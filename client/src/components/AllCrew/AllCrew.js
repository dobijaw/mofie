import React from 'react';
import PropTypes from 'prop-types';

import SubHeadline from 'components/SubHeadline/SubHeadline';
import Crew from 'components/Production/Crew/Crew';
import styles from './AllCrew.module.scss';

const AllCrew = ({ crew }) => (
  <section className={styles.allCrew}>
    <SubHeadline>Crew</SubHeadline>
    <Crew crew={crew} />
  </section>
);

AllCrew.propTypes = {
  crew: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AllCrew;
