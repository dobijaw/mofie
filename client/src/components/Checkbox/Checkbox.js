import React from 'react';
import PropTypes from 'prop-types';
import FormError from 'components/FormError/FormError';
import styles from './Checkbox.module.scss';

const Checkbox = ({ label, type, id, name, value, error, onChange, onBlur }) => (
  <div>
    <label htmlFor={id} className={styles.checkbox}>
      {label}
      {console.log(value)}
      <input
        type={type}
        className={styles.checkbox_input}
        onChange={onChange ? (e) => onChange(name, e.target.checked) : null}
        onBlur={onBlur && onBlur}
        id={id}
        name={name}
        value={value}
        checked={value}
      />
      <span className={styles.checkbox_mark} />
    </label>
    {error && <FormError error={error} />}
  </div>
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
