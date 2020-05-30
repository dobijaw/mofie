import React from 'react';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import PageTitle from 'components/PageTitle/PageTitle';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import Categories from 'components/Categories/Categories';

const CategoriesView = () => {
  return (
    <MainTemplate>
      <PageTitle center>Categories</PageTitle>
      <AddNewItem />
      <Categories />
    </MainTemplate>
  );
};

export default CategoriesView;
