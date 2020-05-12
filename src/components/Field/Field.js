import React from 'react';
import styles from './Field.module.scss';

const Field = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  label,
  lightTheme,
  error,
  touch,
}) => (
  <div className={styles.field}>
    <label htmlFor={id} className={styles.fieldLabel}>
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={
        !lightTheme
          ? styles.fieldInput
          : `${styles.fieldInput} ${styles.fieldInputLight}`
      }
    />
    {(touch || error) && (
      <span className={styles.fieldError}>{touch || error}</span>
    )}
  </div>
);

export default Field;
