import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Form = ({
  render,
  onSubmit,
  validate,
  className,
  checkChanges,
  initialValues,
  submitOnChange,
  inputRequiringCleaning,
}) => {
  const [errors, setErrors] = useState({});
  const [curName, setCurName] = useState('');
  const [values, setValues] = useState(initialValues);
  const [currentError, setCurrentError] = useState('');
  const [disabledSubmit, toggleSubmitDisabled] = useState(false);

  useEffect(() => {
    setCurrentError(errors[curName] || '');
  }, [errors, curName]);

  const getAllErrors = useCallback((validateRules) => {
    const validateErrors = {};

    Object.entries(validateRules).forEach((property) => {
      const errorsHere = property[1].find((i) => !i.correct);
      validateErrors[property[0]] = errorsHere?.errorMessage || '';
    });

    return validateErrors;
  }, []);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setCurName(name);

    if (submitOnChange) onSubmit({ ...values, [name]: value });
  };

  useEffect(() => {
    const data = validate(values);
    const anyError = data[curName] && data[curName].find((i) => !i.correct);

    if (currentError) setErrors((e) => ({ ...e, [curName]: anyError?.errorMessage }));
  }, [values, curName, validate, currentError]);

  const handleBlur = (name) => {
    const validateErrors = getAllErrors(validate(values));
    setErrors({ ...errors, [name]: validateErrors[name] || '' });
  };

  const clearInputs = (inputs) => {
    if (!inputs) return;

    const clearedInputs = Object.entries(values).map((item) =>
      inputs.includes(item[0]) ? [item[0], initialValues[item[0]]] : item,
    );
    const newObjectValues = Object.fromEntries(clearedInputs);

    setValues(newObjectValues);
  };

  const clearInputsCallback = useCallback(clearInputs, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabledSubmit) return;

    const validateErrors = getAllErrors(validate(values));
    setErrors(validateErrors);

    const submitPossible = Object.values(validateErrors).some((i) => !!i);
    if (!submitPossible) {
      onSubmit(values);
      if (checkChanges) toggleSubmitDisabled(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (checkChanges) toggleSubmitDisabled(false);
      if (inputRequiringCleaning) clearInputsCallback(inputRequiringCleaning);
    }, 250);

    return () => clearTimeout(timeout);
  }, [checkChanges, inputRequiringCleaning, clearInputsCallback]);

  return (
    <form
      style={{
        width: '100%',
      }}
      className={className}
      onSubmit={handleSubmit}
      noValidate
    >
      {render(values, errors, handleChange, handleBlur, disabledSubmit)}
    </form>
  );
};

Form.propTypes = {
  render: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  submitOnChange: PropTypes.bool,
  checkChanges: PropTypes.bool,
  inputRequiringCleaning: PropTypes.bool,
};

Form.defaultProps = {
  className: '',
  checkChanges: false,
  submitOnChange: false,
  inputRequiringCleaning: false,
};

export default Form;
