import React from 'react';
import PropTypes from 'prop-types';
import styles from './Label.module.scss';

const Label = ({ id, name }) => (
  <label htmlFor={id} className={styles.label}>
    {name}
  </label>
);

Label.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Label;
