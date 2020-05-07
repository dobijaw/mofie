import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductionView from 'views/ProductionView/ProductionView';
import Navigation from 'components/Navigation/Navigation';
import Modal from 'components/Modal/Modal';
import ShowView from 'views/ShowView/ShowView';
import PopularView from 'views/PopularView/PopularView';
import MovieView from 'views/MovieView/MovieView';
import CollectionView from 'views/CollectionView/CollectionView';
import Page404View from 'views/Page404View/Page404View';
import { useFetch } from 'hooks';
import { routes } from 'routes';
import Store from 'store';
import { RootContext } from 'context';
import { API_KEY } from 'config';
import ActorView from 'views/ActorView/ActorView';
import styles from './Root.module.scss';

const ratingScale = [
  {
    value: 1,
    name: '1',
  },
  {
    value: 2,
    name: '2',
  },
  {
    value: 3,
    name: '3',
  },
  {
    value: 4,
    name: '4',
  },
  {
    value: 5,
    name: '5',
  },
  {
    value: 6,
    name: '6',
  },
  {
    value: 7,
    name: '7',
  },
  {
    value: 8,
    name: '8',
  },
  {
    value: 9,
    name: '9',
  },
  {
    value: 10,
    name: '10',
  },
];

const Root = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState({});

  const movieGenresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const showGenresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

  const [movieGenres, movieGenresErrors] = useFetch(movieGenresURL);
  const [showGenres, showGenresErrors] = useFetch(showGenresURL);

  const handleOpenModal = (productionType, id) => {
    setModalVisibility(true);
    setSelectedProduction({
      productionType,
      id,
    });
  };

  const handleCloseModal = () => {
    setModalVisibility(false);
  };

  const contextElements = {
    handleOpenModal,
    handleCloseModal,
    movieGenres,
    showGenres,
    movieGenresErrors,
    showGenresErrors,
    ratingScale,
  };

  return (
    <BrowserRouter>
      <Store>
        <RootContext.Provider value={contextElements}>
          <div className={styles.root}>
            <Navigation />
            <main className={styles.main}>
              <Switch>
                <Route exact path={routes.home} component={PopularView} />
                <Route path={routes.singleMovie} component={ProductionView} />
                <Route path={routes.singleShow} component={ProductionView} />
                <Route path={routes.movies} component={MovieView} />
                <Route path={routes.shows} component={ShowView} />
                <Route path={routes.collection} component={CollectionView} />
                <Route path={routes.page404} component={Page404View} />
                <Route path={routes.singleActor} component={ActorView} />
              </Switch>
            </main>
          </div>
          {isModalVisible && <Modal selected={selectedProduction} />}
        </RootContext.Provider>
      </Store>
    </BrowserRouter>
  );
};

export default Root;
