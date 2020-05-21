import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
} from 'actions/categories';

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case DELETE_CATEGORY:
      return [...state];
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default categoriesReducer;
