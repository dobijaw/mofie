import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'context';
import { clearErrors } from 'actions/user';

import Bar from 'components/Bar/Bar';
import Copy from 'components/Copy/Copy';
import Logo from 'components/Navigation/Logo/Logo';
import PageTitle from 'components/PageTitle/PageTitle';
import FooterRoute from 'components/FooterRoute/FooterRoute';
import styles from './UserAuthentication.module.scss';

const UserAuthentication = ({
  copy,
  title,
  route,
  children,
  routeName,
  errorMessage,
  description,
}) => {
  const { user, userDispatch } = useContext(AppContext);
  const [isErrorVisible, toggleErrorVisibility] = useState(false);

  useEffect(() => toggleErrorVisibility(!!user.error), [user]);
  useEffect(() => () => clearErrors(userDispatch), [userDispatch]);

  return (
    <div className={styles.authentication}>
      {isErrorVisible && (
        <Bar message={errorMessage} handleClose={() => clearErrors(userDispatch)} />
      )}
      <aside className={styles.authentication_sidebar}>
        <Logo isMiddle />
      </aside>
      <div className={styles.authentication_column}>
        <div className={styles.authentication_box}>
          <div>
            <header className={styles.authentication_header}>
              <PageTitle asHeadline center>
                {title}
              </PageTitle>
              <Copy>{description}</Copy>
            </header>
            <main className={styles.authentication_main}>{children}</main>
          </div>
          <FooterRoute copy={copy} route={route} routeName={routeName} />
        </div>
      </div>
    </div>
  );
};

UserAuthentication.propTypes = {
  copy: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  routeName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default UserAuthentication;
