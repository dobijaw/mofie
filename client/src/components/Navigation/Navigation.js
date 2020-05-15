import React, { useState } from 'react';

import styles from './Navigation.module.scss';
import Burger from './Burger/Burger';
import Logo from './Logo/Logo';
import NavList from './NavList/NavList';

const Navigation = () => {
  const [isOpen, changeOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Logo />
        <Burger openMenuFn={() => changeOpen(!isOpen)} />
        <NavList isOpen={isOpen} />
      </nav>
    </header>
  );
};

export default Navigation;
