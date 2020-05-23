import React, { useReducer, useEffect } from 'react';
import categoriesReducer from 'reducers/categories';
import collectionReducer from 'reducers/collection';
import userReducer from 'reducers/user';
import { AppContext } from 'context';
import { localAuthenticate } from 'actions/user';

const Store = ({ children }) => {
  const userInitial = { id: undefined, email: undefined, error: undefined };

  const [user, userDispatch] = useReducer(userReducer, userInitial);
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);
  const [collection, collectionDispatch] = useReducer(collectionReducer, []);

  useEffect(() => {
    localAuthenticate(userDispatch);
  }, []);

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
      {/* {console.log('elo categories state: ')} */}
      {/* {console.log(state.categories)} */}
      {console.log(state.user)}
      {children}
    </AppContext.Provider>
  );
};

export default Store;
