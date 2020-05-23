import React, { useContext } from 'react';
import { routes } from 'routes';
import { AppContext } from 'context';
import { logout } from 'actions/user';
import Button from 'components/Button/Button';
import NavItem from './NavItem/NavItem';
import styles from './NavList.module.scss';

const NavList = ({ isOpen }) => {
  const { user, userDispatch } = useContext(AppContext);

  const handleLogOut = () => {
    logout(userDispatch);
  };

  return (
    <>
      <div className={isOpen ? styles.navListActive : styles.navList}>
        <ul className={styles.navListItem}>
          <NavItem name="Movies" link={routes.movies} />
          <NavItem name="Shows" link={routes.shows} />
          {user.isAuth && <NavItem name="Collection" link={routes.collection} />}
          {user.isAuth ? (
            <li>
              <Button handleClick={handleLogOut} className={styles.navListButton}>
                LOG OUT
              </Button>
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
