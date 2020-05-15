import React, { useState, useEffect } from 'react';
import Button from 'components/Button/Button';
import styles from './Pagination.module.scss';
import PaginationItem from './PaginationItem/PaginationItem';

const Pagination = ({ currentPage, totalPages, handleCurrentPage }) => {
  const [paginationItems, setPaginationItems] = useState([]);

  useEffect(() => {
    const arr = [];

    if (currentPage <= 2) {
      for (let i = 1; i <= 5; i++) {
        arr.push({
          key: i,
          value: i !== 4 ? i : '...',
          isNumber: i !== 4,
        });
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = 1; i <= 5; i++) {
        arr.push({
          key: i,
          value:
            totalPages - 5 + i === totalPages - 3 ? '...' : totalPages - 5 + i,
          isNumber: totalPages - 5 + i !== totalPages - 3,
        });
      }
    } else if (currentPage === 3) {
      for (let i = 1; i <= 6; i++) {
        arr.push({
          key: i,
          value: i !== 5 ? i : '...',
          isNumber: i !== 5,
        });
      }
    } else if (currentPage === totalPages - 2) {
      for (let i = 1; i <= 6; i++) {
        arr.push({
          key: i,
          value: i === 1 ? 1 : i === 2 ? '...' : totalPages - 6 + i,
          isNumber: i !== 2,
        });
      }
    } else {
      for (let i = 1; i <= 7; i++) {
        arr.push({
          key: i,
          value:
            i === 2 || i === 6
              ? '...'
              : i === 1
              ? 1
              : i === 7
              ? totalPages
              : i === 3
              ? currentPage - 1
              : i === 4
              ? currentPage
              : currentPage + 1,
          isNumber: !(i === 2 || i === 6),
        });
      }
    }

    setPaginationItems(arr);
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <Button
        type="button"
        handleClick={() => {
          handleCurrentPage(currentPage - 1);
        }}
        disabled={currentPage <= 1}
        className={styles.paginationButton}
      >
        prev
      </Button>
      <ul className={styles.paginationList}>
        {paginationItems.map((item) => (
          <PaginationItem
            key={item.key}
            number={item.isNumber}
            handleClick={() => handleCurrentPage(item.value)}
            active={currentPage === item.value}
          >
            {item.value}
          </PaginationItem>
        ))}
      </ul>
      <Button
        type="button"
        handleClick={() => {
          handleCurrentPage(currentPage + 1);
        }}
        disabled={currentPage >= totalPages}
        className={styles.paginationButton}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;
