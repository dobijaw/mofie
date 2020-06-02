import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'context';
import { logout } from 'actions/user';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import styles from './NavSettings.module.scss';

const Settings = ({ className }) => {
  const { userDispatch } = useContext(AppContext);

  return (
    <ul className={[styles.settings, className].join(' ')}>
      <li className={styles.settings_item}>
        <Link to={routes.categories} className={styles.settings_link}>
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

Settings.propTypes = {
  className: PropTypes.string,
};

Settings.defaultProps = {
  className: '',
};

export default Settings;
