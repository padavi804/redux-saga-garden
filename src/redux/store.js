import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload]
    case 'FETCH_PLANT':
      return action.payload;
    default:
      return state;
  }
};

function* fetchPlants() {
  try {
    const plantResponse = yield axios.get('/api/plants');
    yield put({ type: 'ADD_PLANT', payload: plantResponse.data });
  }
  catch (error) {
    console.log('Error fetching plants', error);
  }
}

function* sendPlants(action) {
  try {
    console.log('action.payload', action.payload);
    const plantResponse = yield axios({ method: 'POST', url: '/api/plants', data: { name: action.payload } });
    yield put({ type: 'FETCH_PLANTS' })
  }
  catch (error) {
    console.log('Error fetching elements', error);
  }
}


function* rootSaga() {
  yield takeEvery('ADD_PLANT', fetchPlants)
  yield takeEvery('FETCH_PLANTS', sendPlants)
}
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
sagaMiddleware.run(rootSaga);


export default store;
