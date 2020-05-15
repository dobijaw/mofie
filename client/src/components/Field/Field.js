import React from 'react';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import FormError from 'components/FormError/FormError';
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

export default Field;
