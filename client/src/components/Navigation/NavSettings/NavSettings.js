import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'context';
import { logout } from 'actions/user';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import styles from './NavSettings.module.scss';

const Settings = ({ className, noHidden, closeMenu }) => {
  const { userDispatch } = useContext(AppContext);
  const handleClick = () => {
    logout(userDispatch);
    closeMenu();

    document.body.removeAttribute('style');
  };
  return (
    <ul
      className={[styles.settings, noHidden && styles.settings___noHidden, className].join(
        ' ',
      )}
    >
      <li className={styles.settings_item}>
        <Link to={routes.categories} className={styles.settings_link}>
          Categories
        </Link>
      </li>
      <li className={styles.settings_item}>
        <button type="button" onClick={handleClick} className={styles.settings_button}>
          LOG OUT
        </button>
      </li>
    </ul>
  );
};

Settings.propTypes = {
  className: PropTypes.string,
  noHidden: PropTypes.bool,
  closeMenu: PropTypes.func,
};

Settings.defaultProps = {
  className: '',
  noHidden: false,
  closeMenu: () => {},
};

export default Settings;
