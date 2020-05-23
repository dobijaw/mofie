import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectItem.module.scss';

const SelectItem = ({ value, handleClick, children, className }) => (
  <li className={className}>
    {children ? (
      <>{children}</>
    ) : (
      <button type="button" onClick={handleClick} className={styles.selectItemButton}>
        {value}
      </button>
    )}
  </li>
);

SelectItem.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
};

SelectItem.defaultProps = {
  value: '',
  handleClick: null,
  children: null,
  className: '',
};

export default SelectItem;
