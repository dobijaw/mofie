import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import PaginationItem from './PaginationItem/PaginationItem';
import styles from './Pagination.module.scss';

const Pagination = ({ initialPage, totalPages, getCurrentPage, valueRequiringReset }) => {
  const [paginationItems, setPaginationItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [valueRequiringReset, initialPage]);

  const getMinimalTheme = (array) => array.map((_, index) => index + 1);

  const getFirstTheme = (total, array) =>
    array.map((item, index, arr) =>
      arr.length - 1 === index ? total : arr.length - 2 === index ? item : index + 1,
    );

  const getMiddleTheme = (total, array, initial) =>
    array.map((item, index, arr) =>
      index === 0 ? initial : index === 1 ? item : total - arr.length + index + 1,
    );

  const getLastTheme = (page, total, array, initial) =>
    array.map((item, index, arr) =>
      index === initial || index === arr.length - 2
        ? item
        : index === 0
        ? initial
        : index === arr.length - 1
        ? total
        : index === 2
        ? page - 1
        : index === arr.length - 3
        ? page + 1
        : page,
    );

  const getMinimalThemeCallback = useCallback(getMinimalTheme, []);
  const getFirstThemeCallback = useCallback(getFirstTheme, []);
  const getMiddleThemeCallback = useCallback(getMiddleTheme, []);
  const getLastThemeCallback = useCallback(getLastTheme, []);

  const createPages = (page, total, initial) => {
    const initialArray = Array(total > 7 ? 7 : total).fill(null);

    if (total <= 7) {
      return getMinimalThemeCallback(initialArray);
    }
    if (page < 4) {
      return getFirstThemeCallback(total, initialArray);
    }
    if (page > total - 3) {
      return getMiddleThemeCallback(total, initialArray, initial);
    }
    return getLastThemeCallback(page, total, initialArray, initial);
  };

  const createPagesCallback = useCallback(createPages, [
    getMinimalThemeCallback,
    getFirstThemeCallback,
    getMiddleThemeCallback,
    getLastThemeCallback,
  ]);

  useEffect(() => {
    setPaginationItems(createPagesCallback(currentPage, totalPages, initialPage));
  }, [createPagesCallback, initialPage, currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <Button
        type="button"
        handleClick={() => handlePageChange(currentPage - 1)}
        className={[styles.pagination_button, styles.pagination_button___prev].join(' ')}
        disabled={currentPage - 1 < initialPage}
      >
        prev
      </Button>
      <ul className={styles.pagination_list}>
        {paginationItems.map((p, idx, { length }) => (
          <PaginationItem
            key={p || idx * length * Math.random()}
            handleClick={() => handlePageChange(p)}
            isActive={currentPage === p}
            value={p}
          />
        ))}
      </ul>
      <Button
        type="button"
        handleClick={() => handlePageChange(currentPage + 1)}
        className={[styles.pagination_button, styles.pagination_button___next].join(' ')}
        disabled={currentPage + 1 > totalPages}
      >
        next
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  initialPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  getCurrentPage: PropTypes.func.isRequired,
  valueRequiringReset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Pagination.defaultProps = {
  valueRequiringReset: null,
};

export default Pagination;
