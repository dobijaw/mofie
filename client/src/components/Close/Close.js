import React from 'react';
import PropTypes from 'prop-types';
import styles from './Close.module.scss';

const Close = ({ handleClose, asWhite }) => (
  <button
    type="button"
    className={[styles.close, asWhite && styles.close___white].join(' ')}
    onClick={handleClose}
    aria-label="Close modal"
  />
);

Close.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Close;
