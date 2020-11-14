import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore,persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user/userReducer';

export const ConfigureStore=()=>{
  const config={
    key:'root',
    storage:AsyncStorage,
    debug:true
  };
	const store=createStore(
        persistCombineReducers(config,{
          user:userReducer,
         }),
         applyMiddleware(thunk,logger)
		);

  const persistor=persistStore(store);
	return {persistor,store};
}