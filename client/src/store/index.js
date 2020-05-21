import React, { useReducer } from 'react';
import categoriesReducer from 'reducers/categories';
import collectionReducer from 'reducers/collection';
import userReducer from 'reducers/user';
import { AppContext } from 'context';

const Store = ({ children }) => {
  const userInitial = { id: undefined, email: undefined, error: undefined };
  // const userInitial = { id: '123456', email: undefined, error: undefined };

  const [user, userDispatch] = useReducer(userReducer, userInitial);
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);
  const [collection, collectionDispatch] = useReducer(collectionReducer, []);

  const state = {
    user,
    categories,
    collection,
    categoriesDispatch,
    collectionDispatch,
    userDispatch,
  };

  return (
    <AppContext.Provider value={state}>
      {console.log('elo categories state: ')}
      {console.log(state.categories)}
      {children}
    </AppContext.Provider>
  );
};

export default Store;
