import React from 'react';
import PropTypes from 'prop-types';
import DateFormat from 'components/DateFormat/DateFormat';

const Period = ({ birthday, deathday }) => (
  <DateFormat>{deathday ? `${birthday} to ${deathday}` : birthday}</DateFormat>
);

Period.propTypes = {
  birthday: PropTypes.string.isRequired,
  deathday: PropTypes.string,
};

Period.defaultProps = {
  deathday: '',
};

export default Period;
