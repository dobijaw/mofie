import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
  type,
  id,
  name,
  placeholder,
  value,
  onBlur,
  onChange,
  lightTheme,
  disabled,
  onClick,
  inputRef,
  onFocus,
}) => (
  <>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(name, e.target.value) : null}
        onBlur={onBlur && onBlur}
        value={value}
        className={[styles.input, lightTheme && styles.input___light].join(' ')}
        disabled={disabled}
        ref={inputRef}
        onFocus={onFocus}
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(name, e.target.value) : null}
        onBlur={onBlur && onBlur}
        value={value}
        className={[styles.input, lightTheme && styles.input___light].join(' ')}
        disabled={disabled}
        onClick={onClick}
        ref={inputRef}
        onFocus={onFocus}
      />
    )}
  </>
);

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  lightTheme: PropTypes.bool,
  disabled: PropTypes.bool,
  inputRef: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'Type here...',
  value: '',
  onBlur: null,
  onFocus: null,
  onClick: null,
  onChange: null,
  lightTheme: false,
  disabled: false,
  inputRef: null,
};

export default Input;
