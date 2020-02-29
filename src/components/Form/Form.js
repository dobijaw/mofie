import React from 'react';
import styles from './Form.module.scss';
import FormItem from './FormItem/FormItem';

const Form = () => (
  <form className={styles.formWrapper}>
    <FormItem id="year" label="Year" />
  </form>
);

export default Form;
