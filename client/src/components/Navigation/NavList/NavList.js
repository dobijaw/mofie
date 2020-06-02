import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import { AppContext } from 'context';
import { useOutsideClosing } from 'hooks';

import Button from 'components/Button/Button';
import NavSettings from '../NavSettings/NavSettings';
import NavItem from '../NavItem/NavItem';
import styles from './NavList.module.scss';

const NavList = ({ isOpen }) => {
  const { user } = useContext(AppContext);
  const [isSettingsOpen, toggleSettingsVisibility] = useState(false);
  const settingsRef = useOutsideClosing(toggleSettingsVisibility);

  return (
    <>
      <div className={[styles.navList, isOpen && styles.navList___active].join(' ')}>
        <ul className={styles.navList_item}>
          <NavItem name="Movies" link={routes.movies} />
          <NavItem name="Shows" link={routes.shows} />
          {user.isAuth && <NavItem name="Collection" link={routes.collection} />}
          {user.isAuth ? (
            <li className={styles.navList_settings} ref={settingsRef}>
              <Button
                handleClick={() => toggleSettingsVisibility(!isSettingsOpen)}
                className={styles.navList_button}
              >
                SETTINGS
              </Button>
              {isSettingsOpen && <NavSettings className={styles.navList_settingsList} />}
            </li>
          ) : (
            <NavItem name="Login" link={routes.login} asPrimary />
          )}
        </ul>
      </div>
    </>
  );
};

NavList.propTypes = {
  isOpen: PropTypes.bool,
};

NavList.defaultProps = {
  isOpen: false,
};

export default NavList;
