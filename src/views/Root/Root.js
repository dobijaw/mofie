import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from '../../context';
// import API_KEY from '../../config/config';
import styles from './Root.module.scss';
import ShowView from '../ShowView/ShowView';
import NowPlaying from '../NowPlaying/NowPlaying';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';
import Modal from '../../components/Modal/Modal';

class Root extends React.Component {
  state = {
    isOpen: false,
    currentMovieId: 1,
  };

  handleOpenModal = () => {
    this.setState(state => {
      return { isOpen: !state.isOpen };
    });
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
                <Route exact path="/" component={NowPlaying} />
                <Route path="/my-collection" component={CollectionView} />
                <Route path="/find-show" component={ShowView} />
                <Route path="/find-movie" component={MovieView} />
              </Switch>
            </main>
          </div>
          {this.state.isOpen && <Modal id="2" />}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
