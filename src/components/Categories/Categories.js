import React, { useContext } from 'react';
import { AppContext } from 'context';
import styles from './Categories.module.scss';

const Categories = () => {
  const context = useContext(AppContext);

  return (
    <ul className={styles.categories}>
      <li className={styles.categoriesItem}>
        <button type="button" className={styles.categoriesButton}>
          All
        </button>
      </li>
      {context.stateCategories.map((c) => (
        <li key={c.value} className={styles.categoriesItem}>
          <button type="button" className={styles.categoriesButton}>
            {c.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
