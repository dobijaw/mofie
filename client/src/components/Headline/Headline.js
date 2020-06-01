import React from 'react';
import PropTypes from 'prop-types';
import styles from './Headline.module.scss';

const Headline = ({ tag: Tag, children, className, lightTheme, asTitle }) => (
  <Tag
    className={[
      styles.headline,
      lightTheme && styles.headline___dark,
      asTitle && styles.headline___title,
      className,
    ].join(' ')}
  >
    {children}
  </Tag>
);

Headline.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  lightTheme: PropTypes.bool,
  asTitle: PropTypes.bool,
};

Headline.defaultProps = {
  className: '',
  asTitle: false,
  lightTheme: false,
};

export default Headline;
