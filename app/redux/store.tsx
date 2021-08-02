import {createStore, combineReducers, applyMiddleware} from 'redux';
import shopReducer from './reducers/shop';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const rootReducer = combineReducers({
  shop: shopReducer,
});
const persistConfig = {
  key: 'shop',
  storage: AsyncStorage,
  whitelist: ['shop'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));

// @ts-ignore
let persistor = persistStore(store);

export {store, persistor};
