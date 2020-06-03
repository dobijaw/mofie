import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from 'context';
import { routes } from 'routes';

import MainTemplate from 'templates/MainTemplate/MainTemplate';
import PageTitle from 'components/PageTitle/PageTitle';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import Categories from 'components/Categories/Categories';

const CategoriesView = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      {!user.isAuth && <Redirect to={routes.login} />}

      <MainTemplate>
        <PageTitle center>Categories</PageTitle>
        <div style={{ marginTop: '40px' }}>
          <AddNewItem />
          <Categories />
        </div>
      </MainTemplate>
    </>
  );
};

export default CategoriesView;
