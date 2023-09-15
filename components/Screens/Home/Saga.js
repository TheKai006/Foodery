import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {fetchDataFailure, fetchDataSuccess} from './reducers/dataReducer';

function* workGetFetch() {
  try {
    const response = yield call(() => {
      axios.get('https://fakestoreapi.com/products');
    });
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* apiSaga() {
  yield takeEvery('dataSlice/fetchDataRequest', workGetFetch);
}

export default apiSaga;
