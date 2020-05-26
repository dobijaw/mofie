import React from 'react';
import FooterRoute from 'components/FooterRoute/FooterRoute';
import PageTitle from 'components/PageTitle/PageTitle';
import Logo from 'components/Navigation/Logo/Logo';
import Copy from 'components/Copy/Copy';
import styles from './UserAuthentication.module.scss';

const UserAuthentication = ({ title, description, children, copy, route, routeName }) => (
  <div className={styles.authentication}>
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

export default UserAuthentication;
