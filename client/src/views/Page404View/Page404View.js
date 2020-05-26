import React from 'react';
import Button from 'components/Button/Button';
import PageTitle from 'components/PageTitle/PageTitle';
import Copy from 'components/Copy/Copy';
import styles from './Page404View.module.scss';

const Page404View = () => (
  <div className={styles.notFound}>
    <header>
      <PageTitle noMargin center>
        404
      </PageTitle>
    </header>
    <main>
      <Copy>Oops!—We can&apos;t find the page you&apos;re looking for.</Copy>
    </main>
    <footer className={styles.notFound_footer}>
      <Button to="/">Back to home</Button>
    </footer>
  </div>
);

export default Page404View;
