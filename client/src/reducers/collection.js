import { ADD_TO_COLLECTION, GET_COLLECTION, REMOVE_FROM_COLLECTION } from 'actions/collection';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      return [action.payload, ...state];
    case GET_COLLECTION:
      return [...action.payload];
    case REMOVE_FROM_COLLECTION:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};

export default collectionReducer;
