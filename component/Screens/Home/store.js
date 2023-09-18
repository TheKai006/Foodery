import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';
import apiSaga from './Saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataReducer from './reducers/dataReducer';
import {themeSlice} from './reducers/themeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  dataReducer: dataReducer,
  theme: themeSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(apiSaga);

const persistor = persistStore(store);

export {store, persistor};
