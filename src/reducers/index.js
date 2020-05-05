export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case DELETE_CATEGORY:
      return [...state];
    default:
      return state;
  }
};

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      return [...state, action.payload];
    default:
      return state;
  }
};
