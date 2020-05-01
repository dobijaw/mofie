import React, { useState, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SingleMovieView from 'views/SingleProductionView/SingleProductionView';
import Navigation from 'components/Navigation/Navigation';
import Modal from 'components/Modal/Modal';
import AppContext from 'context';
import API_KEY from 'config';
import ShowView from 'views/ShowView/ShowView';
import PopularView from 'views/PopularView/PopularView';
import MovieView from 'views/MovieView/MovieView';
import CollectionView from 'views/CollectionView/CollectionView';
import { useFetch } from 'hooks';
import { routes } from 'routes';
import { categoriesReducer } from 'reducers';
import styles from './Root.module.scss';

const initialCategoriesState = [
  {
    value: 'Love it!',
  },
  {
    value: 'Hate it!',
  },
  {
    value: 'Ok!',
  },
];

const Root = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState({});
  const [categoriesState, dispatchCategories] = useReducer(
    categoriesReducer,
    initialCategoriesState,
  );

  const movieGenresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const showGenresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

  const [movieGenres, movieGenresErrors] = useFetch(movieGenresURL);
  const [showGenres, showGenresErrors] = useFetch(showGenresURL);

  const handleOpenModal = ({ target }) => {
    setModalVisibility(true);
    setSelectedProduction({
      id: target.getAttribute('data-id'),
      type: target.getAttribute('data-type'),
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
    categoriesState,
    dispatchCategories,
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextElements}>
        <div className={styles.root}>
          <Navigation />
          <main className={styles.main}>
            <Switch>
              <Route exact path={routes.home} component={PopularView} />
              <Route path="/:type/:id" component={SingleMovieView} />
              <Route path={routes.movies} component={MovieView} />
              <Route path={routes.shows} component={ShowView} />
              <Route path={routes.collection} component={CollectionView} />
            </Switch>
          </main>
        </div>
        {isModalVisible && <Modal selected={selectedProduction} />}
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
