import React from 'react';
import PropTypes from 'prop-types';
import DateFormat from 'components/DateFormat/DateFormat';

const ReleaseDate = ({ children }) => <DateFormat isSmall>{children}</DateFormat>;

ReleaseDate.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ReleaseDate;
