import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext, RootContext } from 'context';

import Form from 'components/Form/Form';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import Field from 'components/Field/Field';

const AddNewProduction = ({
  listLightTheme,
  initialCategory,
  initialRate,
  initialComment,
  handleSubmit,
  lightTheme,
  buttonCopy,
}) => {
  const { categories } = useContext(AppContext);
  const { ratingScale } = useContext(RootContext);

  return (
    <Form
      initialValues={{
        category: initialCategory,
        rate: initialRate,
        comment: initialComment,
      }}
      validate={(values) => ({
        category: [
          {
            correct: values.category.value,
            errorMessage: 'Category required!',
          },
        ],
        rate: [
          {
            correct: values.rate.value,
            errorMessage: 'Rate required!',
          },
        ],
        comment: [],
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      render={(values, errors, handleChange, handleBlur) => (
        <>
          <Select
            id="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            name="category"
            label="Category"
            error={errors.category}
            options={categories}
            placeholder="Choose a category"
            addNewItem
            lightTheme={lightTheme}
            listLightTheme={listLightTheme}
          />
          <Select
            id="rate"
            value={values.rate}
            onChange={handleChange}
            onBlur={handleBlur}
            name="rate"
            label="Rate"
            error={errors.rate}
            options={ratingScale}
            placeholder="Choose a rate"
            lightTheme={lightTheme}
          />
          <Field
            id="comment"
            type="textarea"
            placeholder="Enter your name"
            value={values.comment}
            name="comment"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Comment"
            error={errors.comment}
            lightTheme={lightTheme}
          />
          <Button type="submit" lightTheme={lightTheme}>
            {buttonCopy}
          </Button>
        </>
      )}
    />
  );
};

AddNewProduction.propTypes = {
  initialCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  initialRate: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  initialComment: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  listLightTheme: PropTypes.bool,
  lightTheme: PropTypes.bool,
  buttonCopy: PropTypes.string.isRequired,
};

AddNewProduction.defaultProps = {
  initialCategory: {
    id: '',
    value: '',
  },
  initialRate: {
    id: '',
    value: '',
  },
  initialComment: '',
  listLightTheme: false,
  lightTheme: false,
};

export default AddNewProduction;
