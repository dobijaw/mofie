import React, { useReducer } from 'react';
import { categoriesReducer, collectionReducer } from 'reducers';
import { AppContext } from 'context';

export const FETCH_TYPE = {
  MOVIE: 'movie',
  TV: 'tv',
};

export const ROUTE_TYPE = {
  MOVIES: 'movies',
  SHOWS: 'shows',
};

const initialStateCategories = [
  {
    value: 'Love it',
    id: 'loveit',
  },
  {
    value: 'Quite good',
    id: 'quitegood',
  },
  {
    value: 'Never again',
    id: 'neveragain',
  },
  {
    value: 'Hate it',
    id: 'hateit',
  },
];

const Store = ({ children }) => {
  const [stateCategories, dispatchCategories] = useReducer(
    categoriesReducer,
    initialStateCategories,
  );

  const [stateCollections, dispatchCollections] = useReducer(
    collectionReducer,
    [],
  );

  const contextElements = {
    stateCategories,
    stateCollections,
    dispatchCategories,
    dispatchCollections,
  };

  return (
    <AppContext.Provider value={contextElements}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
