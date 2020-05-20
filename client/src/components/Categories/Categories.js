import React, { useContext } from 'react';
import { AppContext } from 'context';
import styles from './Categories.module.scss';

const Categories = ({ handleClick, category }) => {
  const state = useContext(AppContext);

  return (
    <ul className={styles.categories}>
      <li
        className={`${styles.categoriesItem} ${
          category === 'all' && styles.categoriesItemActive
        }`}
      >
        <button
          type="button"
          className={styles.categoriesButton}
          onClick={() => handleClick('all')}
        >
          All
        </button>
      </li>
      {state.categories.map((c) => (
        <li
          key={c.value}
          className={`${styles.categoriesItem} ${
            category === c.id && styles.categoriesItemActive
          }`}
        >
          <button
            type="button"
            className={styles.categoriesButton}
            onClick={() => handleClick(c.id)}
          >
            {c.value}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
