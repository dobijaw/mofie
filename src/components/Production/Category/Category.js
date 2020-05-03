import React from 'react';
import PropTypes from 'prop-types';
import styles from './Category.module.scss';

const Category = ({ children }) => (
  <span className={styles.category}>{children}</span>
);

Category.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Category;
