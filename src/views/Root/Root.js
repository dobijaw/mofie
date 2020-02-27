import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './Root.module.scss';
import ShowView from '../ShowView/ShowView';
import NewsView from '../NewsView/NewsView';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';

const Root = () => (
  <BrowserRouter>
    <div className={styles.root}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={NewsView} />
        <Route path="/my-collection" component={CollectionView} />
        <Route path="/find-show" component={ShowView} />
        <Route path="/find-movie" component={MovieView} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Root;
