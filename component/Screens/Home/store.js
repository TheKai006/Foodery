import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataReducer from '../reducers/DataReducer';
import themeSlice from '../reducers/themeReducer';
import langSlice from '../reducers/LanguageReducer';
import apiSaga from './Saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  data: dataReducer,
  theme: themeSlice,
  language: langSlice,
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
