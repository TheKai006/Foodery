import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  fetchDataFailure,
  fetchDataSuccess,
  fetchDataRequest,
} from './reducers/DataReducer';

function* workGetFetch() {
  try {
    const response = yield call(() =>
      axios.get('https://fakestoreapi.com/products'),
    );
    yield put(fetchDataSuccess(response?.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchDataFailure(error.message));
    console.log(error.message);
  }
}

function* apiSaga() {
  yield takeEvery(fetchDataRequest.type, workGetFetch); // Use fetchDataRequest.type to get the action type
}

export default apiSaga;
