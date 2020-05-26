import React from 'react';
import Button from 'components/Button/Button';
import PageTitle from 'components/PageTitle/PageTitle';
import styles from './Page404View.module.scss';

const Page404View = () => (
  <div className={styles.wrapper}>
    <PageTitle center>404</PageTitle>
    <p>Oops!—We can&apos;t find the page you&apos;re looking for.</p>
    <Button to="/">Back to home</Button>
  </div>
);

export default Page404View;
