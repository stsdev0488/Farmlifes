import { createStore, applyMiddleware,compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import  AsyncStorage  from '@react-native-community/async-storage';

import reducers  from './reducers/index';
import initSaga  from './sagas/initSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['onboarding', 'feeds', 'suggestions', 'messenger'],
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()


const middlewares = [sagaMiddleware];
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer,{}, compose(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

// then run the saga
sagaMiddleware.run(initSaga)
