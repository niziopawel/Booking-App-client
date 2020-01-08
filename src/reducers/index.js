import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import NewsReducer from './NewsReducer';
import EmployeeReducer from './EmployeeReducer';
import ServiceReducer from './ServiceReducer';

export default combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  news: NewsReducer,
  employee: EmployeeReducer,
  service: ServiceReducer
});
