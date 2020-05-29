import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

const Checkbox = ({ label, type, id, name }) => (
  <label htmlFor={id} className={styles.checkbox}>
    {label}

    <input
      type={type}
      className={styles.checkbox_input}
      id={id}
      name={name}
      onChange={(e) => {
        console.log(e.target.checked);
      }}
    />
    <span className={styles.checkbox_mark} />
  </label>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
