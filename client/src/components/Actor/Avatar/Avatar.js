import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from 'assets/img/avatar.svg';
import styles from './Avatar.module.scss';

const Avatar = ({ image, isSmall }) => (
  <div
    style={{ backgroundImage: `url(${image || defaultAvatar})` }}
    className={
      isSmall
        ? [styles.avatar, styles.avatar___small, !image && styles.avatar___default].join(' ')
        : [styles.avatar, !image && styles.avatar___default].join(' ')
    }
  />
);

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
};

Avatar.defaultProps = {
  isSmall: false,
};

export default Avatar;
