import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from '../../context';
import styles from './Root.module.scss';
import ShowView from '../ShowView/ShowView';
import NewsView from '../NewsView/NewsView';
import MovieView from '../MovieView/MovieView';
import CollectionView from '../CollectionView/CollectionView';
import Navigation from '../../components/Navigation/Navigation';
// import Modal from '../../components/Modal/Modal';

class Root extends React.Component {
  state = {
    name: 'Roman',
  };

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={this.state.name}>
          <div className={styles.root}>
            <Navigation />
            <main className={styles.main}>
              <Switch>
                <Route exact path="/" component={NewsView} />
                <Route path="/my-collection" component={CollectionView} />
                <Route path="/find-show" component={ShowView} />
                <Route path="/find-movie" component={MovieView} />
              </Switch>
              {/* <Modal /> */}
            </main>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
