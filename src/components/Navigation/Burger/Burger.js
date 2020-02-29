import React, { useState } from 'react';
import styles from './Burger.module.scss';

const Burger = ({ openMenuFn }) => {
  const [active, toggleActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        toggleActive(!active);
        openMenuFn();
      }}
      className={active ? styles.burgerActive : styles.burger}
    >
      <span className={styles.burgerItem} />
      <span className={styles.burgerItem} />
    </button>
  );
};

export default Burger;
