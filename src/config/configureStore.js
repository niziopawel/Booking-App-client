import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import { callAPIMiddleware } from '../middleware/callAPIMiddleware';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(callAPIMiddleware, ReduxThunk, logger)
);
export const persistor = persistStore(store);
