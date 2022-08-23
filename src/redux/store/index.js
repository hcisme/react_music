import { legacy_createStore, combineReducers } from 'redux';
import { mainReducer } from '../reducers/mainReducer.js';
import { deliverMusicInfo } from '../reducers/deliverMusicInfo';
// 状态持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'deliverMusicInfo',
  storage,
  whitelist: ['deliverMusicInfo'],
};

const reducer = combineReducers({
  mainReducer,
  deliverMusicInfo,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = legacy_createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
