import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import myReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas';
import {logger, createLogger} from 'redux-logger';
import userReducer from './actions/userAction/reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  myReducer,
  {},
  compose(applyMiddleware(logger), applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSagas);
export default store;
