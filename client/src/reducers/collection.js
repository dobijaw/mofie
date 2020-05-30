import {
  ADD_TO_COLLECTION,
  GET_COLLECTION,
  REMOVE_FROM_COLLECTION,
  UPDATE_IN_COLLECTION,
} from 'actions/collection';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      return [action.payload, ...state];
    case GET_COLLECTION:
      return [...action.payload.reverse()];
    case UPDATE_IN_COLLECTION:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload.data : item,
      );
    case REMOVE_FROM_COLLECTION:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};

export default collectionReducer;
