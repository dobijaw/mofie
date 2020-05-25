import React, { useContext } from 'react';
import { AppContext } from 'context';
import { logout } from 'actions/user';
import { Link } from 'react-router-dom';
import styles from './Settings.module.scss';

const Settings = ({ className }) => {
  const { userDispatch } = useContext(AppContext);

  return (
    <ul className={[styles.settings, className].join(' ')}>
      <li className={styles.settings_item}>
        <Link to="/categories" className={styles.settings_link}>
          Categories
        </Link>
      </li>
      <li className={styles.settings_item}>
        <button
          type="button"
          onClick={() => logout(userDispatch)}
          className={styles.settings_button}
        >
          LOG OUT
        </button>
      </li>
    </ul>
  );
};

export default Settings;
