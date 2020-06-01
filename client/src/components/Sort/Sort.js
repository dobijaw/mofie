import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/Form/Form';
import Select from 'components/Select/Select';
import styles from './Sort.module.scss';

const Sort = ({
  setValues,
  categoryOptions,
  sortOptions,
  typeOptions,
  initialValue,
  initalTypeValue,
  initialCategory,
}) => (
  <Form
    submitOnChange
    initialValues={{
      category: initialCategory,
      sort: initialValue,
      type: initalTypeValue,
    }}
    validate={() => ({
      category: [],
      sort: [],
      type: [],
    })}
    onSubmit={(values) => {
      setValues(values);
    }}
    render={(values, errors, handleChange, handleBlur) => (
      <div className={styles.sort}>
        <Select
          id="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          name="category"
          label="Category"
          error={errors.category}
          options={categoryOptions}
          className={styles.sortSelect}
        />
        <Select
          id="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          name="type"
          label="Type"
          error={errors.type}
          options={typeOptions}
          className={styles.sortSelect}
        />
        <Select
          id="sort"
          value={values.sort}
          onChange={handleChange}
          onBlur={handleBlur}
          name="sort"
          label="Sort by"
          error={errors.sort}
          options={sortOptions}
          className={styles.sortSelect}
        />
      </div>
    )}
  />
);

Sort.propTypes = {
  setValues: PropTypes.func.isRequired,
  categoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  typeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  initialValue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  initalTypeValue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  initialCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sort;
