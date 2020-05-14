import React from 'react';
import Form from 'components/Form/Form';
import Select from 'components/Select/Select';
import styles from './Sort.module.scss';

const Sort = ({
  setValues,
  sortOptions,
  typeOptions,
  initialValue,
  initalTypeValue,
}) => (
  <Form
    submitOnChange
    initialValues={{
      sort: initialValue,
      type: initalTypeValue,
    }}
    validate={() => ({
      sort: [],
      type: [],
    })}
    onSubmit={(values) => {
      setValues(values);
    }}
    render={(values, errors, handleChange, handleBlur) => (
      <div className={styles.sort}>
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

export default Sort;
