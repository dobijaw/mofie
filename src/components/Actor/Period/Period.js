import React from 'react';
import PropTypes from 'prop-types';
import styles from './Period.module.scss';

const Period = ({ birthday, deathday }) => (
  <div>
    <span className={styles.date}>{birthday} to </span>
    {deathday && <span className={styles.date}>{deathday}</span>}
  </div>
);

Period.propTypes = {
  birthday: PropTypes.string.isRequired,
  deathday: PropTypes.string,
};

Period.defaultProps = {
  deathday: '',
};

export default Period;
