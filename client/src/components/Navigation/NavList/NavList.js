import React, { useContext, useState } from 'react';
import { routes } from 'routes';
import { AppContext } from 'context';
import Button from 'components/Button/Button';
import { useOutsideClosing } from 'hooks';
import Settings from '../Settings/Settings';
import NavItem from '../NavItem/NavItem';
import styles from './NavList.module.scss';

const NavList = ({ isOpen }) => {
  const { user } = useContext(AppContext);
  const [isSettingsOpen, toggleSettingsVisibility] = useState(false);

  const settingsRef = useOutsideClosing(toggleSettingsVisibility);

  return (
    <>
      <div className={isOpen ? styles.navListActive : styles.navList}>
        <ul className={styles.navListItem}>
          <NavItem name="Movies" link={routes.movies} />
          <NavItem name="Shows" link={routes.shows} />
          {user.isAuth && <NavItem name="Collection" link={routes.collection} />}
          {user.isAuth ? (
            <li className={styles.navListSettings} ref={settingsRef}>
              <Button
                handleClick={() => toggleSettingsVisibility(!isSettingsOpen)}
                className={styles.navListButton}
              >
                SETTINGS
              </Button>
              {isSettingsOpen && <Settings className={styles.navListSettingsList} />}
            </li>
          ) : (
            <NavItem name="Login" link={routes.login} asPrimary />
          )}
        </ul>
      </div>
    </>
  );
};

export default NavList;
