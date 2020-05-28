import React from 'react';
import PropTypes from 'prop-types';
import Close from 'components/Close/Close';
import styles from './Bar.module.scss';

const Bar = ({ message, handleClose }) => (
  <div className={styles.bar}>
    <span className={styles.bar_message}>{message}</span>
    <Close handleClose={handleClose} asWhite />
  </div>
);

Bar.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Bar;
