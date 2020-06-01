import React from 'react';
import PropTypes from 'prop-types';
import styles from './Creators.module.scss';

const Creators = ({ creators }) => (
  <ul className={styles.creators}>
    {creators.map((item) => (
      <li key={item} className={styles.creators_item}>
        {item}
      </li>
    ))}
  </ul>
);

Creators.propTypes = {
  creators: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Creators;
