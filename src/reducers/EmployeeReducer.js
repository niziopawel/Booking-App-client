import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE
} from '../actions/types';

const INITIAL_STATE = { employees: [], loading: false, error: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { ...state, loading: true, error: '' };
    case FETCH_EMPLOYEES_SUCCESS:
      console.log(action.payload);
      return { ...state, employees: action.payload, error: '', loading: false };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        error: 'Ups... Cos poszło nie tak.',
        loading: false
      };
    case CREATE_EMPLOYEE_REQUEST:
      return { ...state, error: '', loading: true };
    case CREATE_EMPLOYEE_SUCCESS:
      return { ...state, error: '', loading: false };
    case CREATE_EMPLOYEE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case DELETE_EMPLOYEE_REQUEST:
      return { ...state, error: '', loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return { ...state, error: '', loading: false };
    case DELETE_EMPLOYEE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_EMPLOYEE_REQUEST:
      return { ...state, error: '', loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return { ...state, error: '', loading: false };
    case UPDATE_EMPLOYEE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
