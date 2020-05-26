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
}) => (
  <>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        value={value}
        className={[styles.input, lightTheme && styles.input___light].join(' ')}
        disabled={disabled}
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(name, e.target.value) : null}
        onBlur={onBlur ? () => onBlur(name) : null}
        value={value}
        className={[styles.input, lightTheme && styles.input___light].join(' ')}
        disabled={disabled}
        onClick={onClick}
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
  onChange: PropTypes.func,
  lightTheme: PropTypes.bool,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'Type here...',
  value: '',
  onBlur: null,
  onChange: null,
  lightTheme: false,
  disabled: false,
};

export default Input;
