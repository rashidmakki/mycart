import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {persistStore,persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user/user.reducer';
import shopReducer from './shop/shop.reducer';
import directoryReducer from './directory/directory.reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const ConfigureStore=()=>{
  const config={
    key:'root',
    storage:AsyncStorage,
    debug:true
  };
	const store=createStore(
        persistCombineReducers(config,{
          user:userReducer,
          directory:directoryReducer,
          shop:shopReducer
         }),
         applyMiddleware(sagaMiddleware,thunk,logger)
		);
  
  sagaMiddleware.run(rootSaga);
  const persistor=persistStore(store);
	return {persistor,store};
}