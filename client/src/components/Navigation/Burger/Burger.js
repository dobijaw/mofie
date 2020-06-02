import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Burger.module.scss';

const Burger = ({ openMenuFn }) => {
  const [isActive, toggleActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        toggleActive(!isActive);
        openMenuFn();
      }}
      className={[styles.burger, isActive && styles.burger___active].join(' ')}
    >
      <span className={styles.burger_item} />
      <span className={styles.burger_item} />
    </button>
  );
};

Burger.propTypes = {
  openMenuFn: PropTypes.func.isRequired,
};

export default Burger;
