import React from 'react';
import PropTypes from 'prop-types';
import FormError from 'components/FormError/FormError';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import styles from './Field.module.scss';

const Field = ({
  id,
  type,
  value,
  lightTheme,
  placeholder,
  onChange,
  onBlur,
  name,
  label,
  error,
}) => (
  <div className={styles.field}>
    <Label id={id} name={label} />
    <Input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      lightTheme={lightTheme}
    />
    {error && <FormError error={error} />}
  </div>
);

Field.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  lightTheme: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Field.defaultProps = {
  error: '',
  type: '',
  value: '',
  placeholder: '',
  lightTheme: false,
  onBlur: null,
  onChange: null,
};

export default Field;
