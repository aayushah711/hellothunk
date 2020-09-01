import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import appReducer from './App/reducer';
import loginReducer from './Login/loginReducer';
import registrationReducer from './Registration/registrationReducer';

const rootReducer = combineReducers({
	app: appReducer,
	registration: registrationReducer,
	login: loginReducer
});

const logger = (store) => (next) => (action) => {
	const val = next(action);
	console.log(store.getState());
	return val;
};

const thunk = (store) => (next) => (action) => {
	typeof action === 'function' ? action(store.dispatch) : next(action);
};

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, enhancer);

export default store;
