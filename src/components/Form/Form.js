import React from 'react';
import styles from './Form.module.scss';
import InputItem from './InputItem/InputItem';

const Form = () => (
  <form className={styles.formWrapper}>
    <InputItem id="inOneWord" label="In one word" />
    <InputItem id="inNumScale" label="In number scale" />
    <InputItem id="inComment" label="Your Comment" />
  </form>
);

export default Form;
