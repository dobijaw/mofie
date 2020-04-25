import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from '../../context';
import styles from './Root.module.scss';
import API_KEY from '../../config/config';
import ShowView from '../ShowView/ShowView';
import PopularView from '../PopularView/PopularView';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';
import Modal from '../../components/Modal/Modal';
import SingleMovieView from '../SingleMovieView/SingleMovieView';

class Root extends Component {
  state = {
    isModalOpen: false,
    selected: {
      id: 0,
      type: '',
    },
    movieCollection: [],
    genres: {
      movies: [],
      shows: [],
    },
  };

  abortController = new window.AbortController();

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
      { signal: this.abortController.signal },
    )
      .then(resp => resp.json())
      .then(resp => resp.genres)
      .then(data => this.setState({ genres: { movies: data } }));

    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`,
      { signal: this.abortController.signal },
    )
      .then(resp => resp.json())
      .then(resp => resp.genres)
      .then(data => this.setState({ genres: { shows: data } }));
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleOpenModal = e => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
    this.setState({
      selected: {
        id: e.target.getAttribute('data-id'),
        type: e.target.getAttribute('data-type'),
      },
    });
  };

  handleCloseModal = () => {
    this.setState(state => {
      return { isModalOpen: !state.isModalOpen };
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
                <Route exact path="/" component={PopularView} />
                <Route path="/:type/:id" component={SingleMovieView} />
                <Route path="/my-collection" component={CollectionView} />
                <Route path="/find-show" component={ShowView} />
                <Route path="/find-movie" component={MovieView} />
              </Switch>
            </main>
          </div>
          {this.state.isModalOpen && <Modal selected={this.state.selected} />}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
