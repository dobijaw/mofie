import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubHeadline.module.scss';

const SubHeadline = ({ children }) => (
  <div className={styles.subHeadline}>
    <h2 className={styles.subHeadline_text}>{children}</h2>
  </div>
);

SubHeadline.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubHeadline;
