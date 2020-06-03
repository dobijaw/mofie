import React, { useState } from 'react';

import Logo from './Logo/Logo';
import Burger from './Burger/Burger';
import NavList from './NavList/NavList';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const [isOpen, changeOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Logo />
        <Burger openMenuFn={() => changeOpen(!isOpen)} isOpen={isOpen} />
        <NavList isOpen={isOpen} closeMenu={() => changeOpen(false)} />
      </nav>
    </header>
  );
};

export default Navigation;
