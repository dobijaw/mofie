import React, { useContext } from 'react';
import { AppContext } from 'context';
import styles from './Categories.module.scss';

const Categories = () => {
  const context = useContext(AppContext);

  return (
    <ul className={styles.categories}>
      {context.stateCategories.map((c) => (
        <li key={c.value}>{c.name}</li>
      ))}
    </ul>
  );
};

export default Categories;
