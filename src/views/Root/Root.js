import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from '../../context';
import API_KEY from '../../config/config';
import styles from './Root.module.scss';
import ShowView from '../ShowView/ShowView';
import NowPlaying from '../NowPlaying/NowPlaying';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';

const Root = () => {
  // eslint-disable-next-line
  const [hasError, setErrors] = useState(false);
  const [genresMovie, setGenresMovie] = useState([]);

  const fetchData = async () => {
    const link = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(link);

    response
      .json()
      .then(resp => resp.genres)
      .then(resp => setGenresMovie(resp))
      .catch(err => setErrors(err));
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <BrowserRouter>
      <AppContext.Provider value={genresMovie}>
        <div className={styles.root}>
          <Navigation />
          <main className={styles.main}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <NowPlaying genresMovie={genresMovie} />}
              />
              <Route path="/my-collection" component={CollectionView} />
              <Route path="/find-show" component={ShowView} />
              <Route path="/find-movie" component={MovieView} />
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
