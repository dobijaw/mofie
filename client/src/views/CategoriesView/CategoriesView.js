import React from 'react';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import PageTitle from 'components/PageTitle/PageTitle';
import Checkbox from 'components/Checkbox/Checkbox';

const CategoriesView = () => {
  return (
    <MainTemplate>
      <PageTitle center>Categories</PageTitle>
      <Checkbox label="I agree that this is only test app" id="Agree" name="agree" />
    </MainTemplate>
  );
};

export default CategoriesView;
