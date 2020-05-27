import React from 'react';
import SubHeadline from 'components/SubHeadline/SubHeadline';
import Crew from 'components/Production/Crew/Crew';

const AllCrew = ({ crew }) => (
  <section>
    <SubHeadline>Crew</SubHeadline>
    <Crew crew={crew} />
  </section>
);

export default AllCrew;
