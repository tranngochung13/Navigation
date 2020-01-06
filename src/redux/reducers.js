import _ from 'lodash';
import { combineReducers } from 'redux';
import task from '../redux/actions/todoListAction/reducer';
import userReducer from './actions/userAction/reducer';

const myReducer = combineReducers({
  task,
  user: userReducer,
});

export default myReducer;
