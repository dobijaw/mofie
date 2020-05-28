import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaginationItem.module.scss';

const PaginationItem = ({ value, handleClick, isActive }) => (
  <li className={styles.paginationItem}>
    {value ? (
      <button
        onClick={handleClick}
        className={[
          styles.paginationItem_button,
          isActive && styles.paginationItem_button___active,
        ].join(' ')}
      >
        {value}
      </button>
    ) : (
      <span className={styles.paginationItem_nodata}>...</span>
    )}
  </li>
);

PaginationItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  value: PropTypes.number,
};

PaginationItem.defaultProps = {
  isActive: false,
  value: null,
};

export default PaginationItem;
