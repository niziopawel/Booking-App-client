import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  FETCH_POST_REQUEST
} from '../actions/types';

const INITIAL_STATE = { posts: [], loading: false, error: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case FETCH_POST_REQUEST:
      return { ...state, loading: true, error: '' };
    case FETCH_POST_SUCCESS:
      console.log(action.payload);
      return { ...state, posts: action.payload, error: '', loading: false };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        error: 'Ups... Cos poszło nie tak.',
        loading: false
      };
    case CREATE_POST_REQUEST:
      return { ...state, error: '', loading: true };
    case CREATE_POST_SUCCESS:
      return { ...state, error: '', loading: false };
    case CREATE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_POST_REQUEST:
      return { ...state, error: '', loading: true };
    case UPDATE_POST_SUCCESS:
      return { ...state, error: '', loading: false };
    case UPDATE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DELETE_POST_REQUEST:
      return { ...state, error: '', loading: true };
    case DELETE_POST_SUCCESS:
      return { ...state, error: '', loading: false };
    case DELETE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
