import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import { AppContext } from 'context';
import { useOutsideClosing } from 'hooks';

import Button from 'components/Button/Button';
import NavSettings from '../NavSettings/NavSettings';
import NavItem from '../NavItem/NavItem';
import styles from './NavList.module.scss';

const NavList = ({ isOpen, closeMenu }) => {
  const { user } = useContext(AppContext);
  const [isSettingsOpen, toggleSettingsVisibility] = useState(false);
  const settingsRef = useOutsideClosing(toggleSettingsVisibility);
  const [isDesktop, toggleDesktop] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 960) {
      toggleDesktop(true);
    } else {
      toggleDesktop(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={[styles.navList, isOpen && styles.navList___active].join(' ')}>
        <ul className={styles.navList_item}>
          <NavItem name="Movies" link={routes.movies} />
          <NavItem name="Shows" link={routes.shows} />
          {user.isAuth && <NavItem name="Collection" link={routes.collection} />}

          {user.isAuth ? (
            isDesktop ? (
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
              <>
                <NavSettings noHidden closeMenu={closeMenu} />}
              </>
            )
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
  closeMenu: PropTypes.func,
};

NavList.defaultProps = {
  isOpen: false,
  closeMenu: null,
};

export default NavList;
