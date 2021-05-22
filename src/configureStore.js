import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import  monitorReducersEnhancers from './enhancers/monitorReducers';
import loggerMiddlerware from './middleware/logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddlerware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancers]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}