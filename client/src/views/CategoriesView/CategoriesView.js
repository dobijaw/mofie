import React from 'react';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import Button from 'components/Button/Button';

const CategoriesView = () => (
  <MainTemplate>
    <div
      style={{
        background: 'red',
      }}
    >
      <Button>Hello</Button>
      <Button asDelete />
      <Button asAdd />
      <div
        style={{
          background: 'green',
        }}
      >
        <Button lightTheme>Hello</Button>
        <Button asDelete lightTheme />
        <Button asAdd lightTheme />
      </div>
    </div>
  </MainTemplate>
);

export default CategoriesView;
