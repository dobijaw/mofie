import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

const Avatar = ({ image }) => (
  <div style={{ backgroundImage: `url(${image})` }} className={styles.avatar} />
);

Avatar.propTypes = {
  image: PropTypes.string,
};

Avatar.defaultProps = {
  image: '',
};

export default Avatar;
