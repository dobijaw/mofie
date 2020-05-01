import { ADD_CATEGORY, DELETE_CATEGORY, ADD_TO_COLLECTION } from 'actions';

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case DELETE_CATEGORY:
      return [...state];
    default:
      throw new Error();
  }
};

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      return [...state, action.payload];
    default:
      throw new Error();
  }
};
