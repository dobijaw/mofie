import React, { useContext } from 'react';
import { routes } from 'routes';
import { useUserContext } from 'hooks';
import { AppContext } from 'context';
import { DELETE_USER } from 'reducers';
import NavItem from './NavItem/NavItem';
import styles from './NavList.module.scss';

const NavList = ({ isOpen }) => {
  const isLoggedIn = useUserContext();
  const context = useContext(AppContext);

  const handleLogOut = () => {
    context.dispatchUser({
      type: DELETE_USER,
    });
  };

  return (
    <>
      <div className={isOpen ? styles.navListActive : styles.navList}>
        <ul className={styles.navListItem}>
          <NavItem name="Movies" link={routes.movies} />
          <NavItem name="Shows" link={routes.shows} />
          {isLoggedIn && <NavItem name="Collection" link={routes.collection} />}
          {isLoggedIn ? (
            <button type="button" onClick={handleLogOut}>
              log out
            </button>
          ) : (
            <NavItem name="Login" link={routes.login} asPrimary />
          )}
        </ul>
      </div>
    </>
  );
};

export default NavList;
