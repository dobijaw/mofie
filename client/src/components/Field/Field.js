import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormError from 'components/FormError/FormError';
import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import Tip from 'components/Tip/Tip';
import styles from './Field.module.scss';

const Field = ({
  id,
  type,
  value,
  lightTheme,
  placeholder,
  className,
  onChange,
  onBlur,
  name,
  label,
  error,
  fieldRef,
  message,
}) => {
  const [isTipVisible, toggleTipVisibility] = useState(false);

  const handleBlur = () => {
    onBlur(name);
    toggleTipVisibility(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      toggleTipVisibility(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [isTipVisible]);

  return (
    <div className={[styles.field, className].join(' ')}>
      <Label id={id} name={label} />
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        value={value}
        lightTheme={lightTheme}
        inputRef={fieldRef}
        onFocus={() => toggleTipVisibility(true)}
      />
      {message && <Tip message={message} isVisible={isTipVisible} />}
      {error && <FormError error={error} />}
    </div>
  );
};

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
  className: PropTypes.string,
  message: PropTypes.string,
  fieldRef: PropTypes.object,
};

Field.defaultProps = {
  error: '',
  type: '',
  value: '',
  placeholder: '',
  lightTheme: false,
  onBlur: null,
  onChange: null,
  className: '',
  message: '',
  fieldRef: null,
};

export default Field;
