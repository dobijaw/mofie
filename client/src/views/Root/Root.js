import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RootContext } from 'context';
import { useFetch } from 'hooks';
import { API_KEY } from 'config';
import { routes } from 'routes';

import Store from 'store';
import Modal from 'components/Modal/Modal';
import ShowView from 'views/ShowView/ShowView';
import LoginView from 'views/LoginView/LoginView';
import ActorView from 'views/ActorView/ActorView';
import MovieView from 'views/MovieView/MovieView';
import SignUpView from 'views/SignUpView/SignUpView';
import Page404View from 'views/Page404View/Page404View';
import PopularView from 'views/PopularView/PopularView';
import CategoriesView from 'views/CategoriesView/CategoriesView';
import ProductionView from 'views/ProductionView/ProductionView';
import CollectionView from 'views/CollectionView/CollectionView';

const Root = () => {
  const [isModalVisible, toggleModalVisibility] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState({});

  const movieGenresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const showGenresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

  const [movieGenres, movieGenresErrors, movieGenresLoading] = useFetch(movieGenresURL);
  const [showGenres, showGenresErrors, showGenresLoading] = useFetch(showGenresURL);

  const ratingScale = Array(11)
    .fill({})
    .map((_, index) => ({
      value: index === 0 ? '-' : `${index}`,
      id: index === 0 ? 'norate' : `${index}`,
    }));

  useEffect(() => {
    if (!isModalVisible) {
      const fromTop = parseInt(document.documentElement.style.top, 10);

      document.documentElement.style.position = 'static';
      document.documentElement.scrollTop = -fromTop;

      return;
    }

    const fromTop = document.documentElement.scrollTop;

    document.documentElement.style.position = 'fixed';
    document.documentElement.style.top = `-${fromTop}px`;
  }, [isModalVisible]);

  const handleOpenModal = (productionType, id) => {
    toggleModalVisibility(true);
    setSelectedProduction({
      productionType,
      id,
    });
  };

  const handleCloseModal = () => toggleModalVisibility(false);

  const contextElements = {
    handleOpenModal,
    handleCloseModal,
    isModalVisible,
    movieGenres,
    movieGenresLoading,
    showGenresLoading,
    showGenres,
    movieGenresErrors,
    showGenresErrors,
    ratingScale,
  };

  return (
    <BrowserRouter>
      <Store>
        <RootContext.Provider value={contextElements}>
          <Switch>
            <Route exact path={routes.home} component={PopularView} />
            <Route path={routes.singleMovie} component={ProductionView} />
            <Route path={routes.singleShow} component={ProductionView} />
            <Route path={routes.movies} component={MovieView} />
            <Route path={routes.shows} component={ShowView} />
            <Route path={routes.collection} component={CollectionView} />
            <Route path={routes.page404} component={Page404View} />
            <Route path={routes.singleActor} component={ActorView} />
            <Route path={routes.signup} component={SignUpView} />
            <Route path={routes.login} component={LoginView} />
            <Route path={routes.categories} component={CategoriesView} />
          </Switch>
          {isModalVisible && <Modal selected={selectedProduction} />}
        </RootContext.Provider>
      </Store>
    </BrowserRouter>
  );
};

export default Root;
