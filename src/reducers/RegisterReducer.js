import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/types';

const INITIAL_STATE = { loading: false, error: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: '' };
    case REGISTER_SUCCESS:
      return { ...state, error: '', loading: false };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
