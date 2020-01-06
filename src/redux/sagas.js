import { all } from 'redux-saga/effects';
import {userSagas} from './actions/userAction/saga';

function* rootSagas() {
    yield all([userSagas()]);
}

export default rootSagas;