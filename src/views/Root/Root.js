import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from '../../context';
import styles from './Root.module.scss';
import API_KEY from '../../config/config';
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
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState({
      selected: {
        id: e.target.getAttribute('data-id'),
        type: e.target.getAttribute('data-type'),
      },
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
          {this.state.isOpen && <Modal selected={this.state.selected} />}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
