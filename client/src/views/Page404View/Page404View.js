import React from 'react';
import Button from 'components/Button/Button';
import styles from './Page404View.module.scss';

const Page404View = () => (
  <div className={styles.wrapper}>
    <h1>Oops!—We can&apos;t find the page you&apos;re looking for.</h1>
    <Button to="/">Back to home</Button>
  </div>
);

export default Page404View;
