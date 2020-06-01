import React from 'react';
import PropTypes from 'prop-types';
import styles from './Budget.module.scss';

const Budget = ({ budget, revenue }) => {
  const changeFormat = (value) => {
    const toStringArray = [...value.toString()];
    const arrayWithComma = [];

    toStringArray
      .reverse()
      .forEach((item, index, array) =>
        (index + 1) % 3 === 0 && array.length - 1 !== index
          ? arrayWithComma.push(...[item, '.'])
          : arrayWithComma.push(item),
      );

    return arrayWithComma.reverse().join('');
  };

  const budgetFormat = changeFormat(budget);
  const revenueFormat = changeFormat(revenue);

  return (
    <div className={styles.budget}>
      <div className={styles.budget_item}>
        <span className={styles.budget_title}>Budget:</span>
        <span className={styles.budget_value}>{`$ ${budgetFormat}`}</span>
      </div>
      <div className={styles.budget_item}>
        <span className={styles.budget_title}>Revenue:</span>
        <span className={styles.budget_value}>{`$ ${revenueFormat}`}</span>
      </div>
    </div>
  );
};

Budget.propTypes = {
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
};

export default Budget;
