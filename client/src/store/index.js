import React, { useReducer, useEffect } from 'react';

import userReducer from 'reducers/user';
import categoriesReducer from 'reducers/categories';
import collectionReducer from 'reducers/collection';
import { getCategories } from 'actions/categories';
import { localAuthenticate } from 'actions/user';
import { getCollection } from 'actions/collection';
import { AppContext } from 'context';

const Store = ({ children }) => {
  const userInitial = { id: undefined, token: undefined, error: undefined, isAuth: false };

  const [user, userDispatch] = useReducer(userReducer, userInitial);
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);
  const [collection, collectionDispatch] = useReducer(collectionReducer, []);

  useEffect(() => {
    localAuthenticate(userDispatch);
  }, []);

  useEffect(() => {
    if (user.id) getCategories(categoriesDispatch, user.id);
  }, [categoriesDispatch, user]);

  useEffect(() => {
    if (user.id) getCollection(collectionDispatch, user.id);
  }, [collectionDispatch, user]);

  const state = {
    user,
    categories,
    collection,
    categoriesDispatch,
    collectionDispatch,
    userDispatch,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default Store;
