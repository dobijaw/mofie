import React, { useState, useEffect, useCallback } from 'react';

const Form = ({ render, initialValues, className, onSubmit, validate, submitOnChange }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [curName, setCurName] = useState('');
  const [currentError, setCurrentError] = useState('');

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
    if (!inputs) {
      setValues(initialValues);
      return;
    }

    const clearedInputs = Object.entries(values).map((item) =>
      inputs.includes(item[0]) ? [item[0], ''] : item,
    );
    const newObjectValues = Object.fromEntries(clearedInputs);

    setValues(newObjectValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = getAllErrors(validate(values));
    setErrors(validateErrors);

    const submitPossible = Object.values(validateErrors).some((i) => !!i);
    if (!submitPossible) {
      onSubmit(values, clearInputs);
    }
  };

  return (
    <form
      style={{
        width: '100%',
      }}
      className={className}
      onSubmit={handleSubmit}
      noValidate
    >
      {render(values, errors, handleChange, handleBlur)}
    </form>
  );
};

export default Form;
