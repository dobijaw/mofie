import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectItem.module.scss';

const SelectItem = ({ value, handleClick, children, className, asAddItem }) => (
  <li
    className={[styles.selectItem, asAddItem && styles.selectItem___add, className].join(' ')}
  >
    {children ? (
      <>{children}</>
    ) : (
      <button type="button" onClick={handleClick} className={styles.selectItem_button}>
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
  asAddItem: PropTypes.bool,
};

SelectItem.defaultProps = {
  value: '',
  handleClick: null,
  children: null,
  className: '',
  asAddItem: false,
};

export default SelectItem;
