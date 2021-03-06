import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tip.module.scss';

const Tip = ({ message, isVisible }) => (
  <div className={styles.tip}>
    <div className={styles.tip_mark}>
      <span className={styles.tip_icon}>?</span>
    </div>
    <div className={[styles.tip_message, isVisible && styles.tip_message___visible].join(' ')}>
      <span className={styles.tip_copy}>{message}</span>
    </div>
  </div>
);

Tip.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
};

Tip.defaultProps = {
  isVisible: false,
};

export default Tip;
