import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from '../../context';
import styles from './Root.module.scss';
import ShowView from '../ShowView/ShowView';
import NowPlaying from '../NowPlaying/NowPlaying';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';
import Modal from '../../components/Modal/Modal';
import SingleMovieView from '../SingleMovieView/SingleMovieView';

class Root extends React.Component {
  state = {
    isOpen: false,
    currentMovieId: 4,
    movieCollection: [],
  };

  handleOpenModal = e => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState({ currentMovieId: e.target.getAttribute('data-id') });
  };

  handleCloseModal = () => {
    this.setState(state => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    const contextElements = {
      ...this.state,
      handleOpenModal: this.handleOpenModal,
      handleCloseModal: this.handleCloseModal,
    };

    return (
      <BrowserRouter>
        <AppContext.Provider value={contextElements}>
          <div className={styles.root}>
            <Navigation />
            <main className={styles.main}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/movies" />}
                />
                <Route exact path="/movies" component={NowPlaying} />
                <Route path="/movies/:id" component={SingleMovieView} />
                <Route path="/my-collection" component={CollectionView} />
                <Route path="/find-show" component={ShowView} />
                <Route path="/find-movie" component={MovieView} />
              </Switch>
            </main>
          </div>
          {this.state.isOpen && <Modal id={this.state.currentMovieId} />}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
