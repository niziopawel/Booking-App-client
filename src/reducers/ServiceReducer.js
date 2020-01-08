import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../actions/types';

const INITIAL_STATE = { services: [], loading: false, error: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: '' };
    case FETCH_SERVICES_SUCCESS:
      return { ...state, services: action.payload, error: '', loading: false };
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
        error: 'Ups... Cos poszło nie tak.',
        loading: false
      };
    case UPDATE_SERVICE_REQUEST:
      return { ...state, loading: true, error: '' };
    case UPDATE_SERVICE_SUCCESS:
      return { ...state, services: action.payload, error: '', loading: false };
    case UPDATE_SERVICE_FAILURE:
      return { ...state, service: action.payload, error: '', loading: false };
    case CREATE_SERVICE_REQUEST:
      return { ...state, loading: true, error: '' };
    case CREATE_SERVICE_SUCCESS:
      return { ...state, services: action.payload, error: '', loading: false };
    case CREATE_SERVICE_FAILURE:
      return { ...state, service: action.payload, error: '', loading: false };
    case DELETE_SERVICE_REQUEST:
      return { ...state, loading: true, error: '' };
    case DELETE_SERVICE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case DELETE_SERVICE_FAILURE:
      return { ...state, loading: false, error: '' };
    default:
      return state;
  }
};
