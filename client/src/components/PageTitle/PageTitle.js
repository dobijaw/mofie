import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children, isHidden, small, center, noMargin }) => (
  <h1
    className={[
      styles.title,
      small && styles.title___small,
      isHidden && styles.title___hidden,
      center && styles.title___center,
      noMargin && styles.title___noMargin,
    ].join(' ')}
  >
    {children}
  </h1>
);

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  noMargin: PropTypes.bool,
  center: PropTypes.bool,
  small: PropTypes.bool,
};

PageTitle.defaultProps = {
  isHidden: false,
  noMargin: false,
  center: false,
  small: false,
};

export default PageTitle;
