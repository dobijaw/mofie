import React from 'react';
import FooterRoute from 'components/FooterRoute/FooterRoute';
import PageTitle from 'components/PageTitle/PageTitle';
import Logo from 'components/Navigation/Logo/Logo';
import styles from './UserAuthentication.module.scss';

const UserAuthentication = ({ title, description, children, copy, route, routeName }) => (
  <div className={styles.authentication}>
    <aside className={styles.authenticationSidebar}>
      <Logo isMiddle />
    </aside>
    <div className={styles.authenticationColumn}>
      <div className={styles.authenticationBox}>
        <header className={styles.authenticationHeader}>
          <PageTitle asHeadline center>
            {title}
          </PageTitle>
          <p className={styles.authenticationDescription}>{description}</p>
        </header>
        <main className={styles.authenticationForm}>{children}</main>
        <FooterRoute copy={copy} route={route} routeName={routeName} />
      </div>
    </div>
  </div>
);

export default UserAuthentication;
