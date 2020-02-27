import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShowView from '../ShowView/ShowView';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';

const Root = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path="/" component={CollectionView} />
        <Route path="/find-show" component={ShowView} />
        <Route path="/find-movie" component={MovieView} />
      </Switch>
    </>
  </BrowserRouter>
);

export default Root;
