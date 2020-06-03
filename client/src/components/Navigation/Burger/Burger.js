import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Burger.module.scss';

const Burger = ({ openMenuFn, isOpen }) => {
  const [isActive, toggleActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflowY = 'hidden';
      document.body.style.height = '100vh';
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });
    } else {
      document.body.removeAttribute('style');
    }
  }, [isActive]);

  useEffect(() => {
    if (!isOpen) toggleActive(false);
  }, [isOpen]);

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
  isOpen: PropTypes.bool,
};

Burger.defaultProps = {
  isOpen: false,
};

export default Burger;
