import React, { useReducer } from 'react';
import { categoriesReducer, collectionReducer } from 'reducers';
import { AppContext } from 'context';

const initialStateCategories = [
  {
    value: 'loveit',
    name: 'Love it!',
  },
  {
    value: 'hateit',
    name: 'Hate it!',
  },
  {
    value: 'itsokay',
    name: "It's okay",
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
