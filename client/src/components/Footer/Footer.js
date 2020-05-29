import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <span className={styles.footer_copy}>
      Copyright &copy; 2020. Moffie. The application uses{' '}
      <a href="https://www.themoviedb.org/" className={styles.footer_link}>
        The Movie Database API.
      </a>
    </span>
  </footer>
);

export default Footer;
