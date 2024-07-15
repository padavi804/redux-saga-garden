import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import axios from 'axios';

function* fetchPlants(action) {
  console.log("fetching plants, due to action:", action);

  try {
    const serverResponse = yield axios.get('/api/plants');
    console.log('serverResponse:', serverResponse);
    yield put({ type: 'SET_PLANTLIST', payload: serverResponse.data });
  } catch (error) {
    console.log("Error fetching plants from the server");
  }
}

function* sendPlants(action) {
  console.log("posting plants, due to action:", action);

  try {
    const serverResponse = yield axios({ method: 'POST', url: '/api/plants', data: action.payload });
    console.log('serverResponse:', serverResponse);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    console.log("Error posting plants to the server");
  }
}

function* deletePlants(action) {
  console.log("deleting plants, due to action:", action);

  try {
    const serverResponse = yield axios({ method: 'DELETE', url: `/api/plants/${action.payload}` });
    console.log('serverResponse:', serverResponse);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    console.log("Error deleting plant from the server");
  }
}

function* rootSaga() {
  yield takeEvery('FETCH_PLANTS', fetchPlants);
  yield takeEvery('SEND_PLANTS', sendPlants);
  yield takeEvery('REMOVE_PLANTS', deletePlants);
}

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTLIST':
      return action.payload
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(rootSaga);

export default store;