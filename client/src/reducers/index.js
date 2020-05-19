export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';
export const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';

export const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case DELETE_USER:
      return {};
    default:
      return state;
  }
};

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
      return [
        action.payload,
        ...state.filter((item) => item.id !== action.payload.id),
      ];
    case REMOVE_FROM_COLLECTION:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};
