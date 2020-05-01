import React from 'react';
import styles from './Input.module.scss';

const Input = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  disabled,
  value,
  handleClick,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        type === 'button' && styles.wrapperButton
      }`}
    >
      {type === 'textarea' ? (
        <>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          <textarea
            className={styles.textarea}
            id={id}
            name={name}
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          <input
            className={styles.input}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onClick={type === 'button' ? handleClick : null}
          />
        </>
      )}
    </div>
  );
};

export default Input;
