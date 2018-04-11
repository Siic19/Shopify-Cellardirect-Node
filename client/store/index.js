import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const initState = {
  selectedItems: [],
  requestInProgress: false,
  requestError: null,
  responseBody: '',
  customers: {
    result: []
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case 'UPDATE_SELECTED_ITEMS':
    return {
      ...state,
      selectedItems: action.payload.items,
    }
    case 'REQUEST_START':
      return {
        ...state,
        requestInProgress: true,
        requestError: null,
        responseBody: ''
      };
      case 'REQUEST_CUSTOMERS_COMPLETE':
        return {
          ...state,
          requestInProgress: false,
          requestError: null,
          customers: action.payload.response
        };
    case 'DELETE_CUSTOMERS_COMPLETE':
    console.log('in the reducer payload ', action.payload.data );

    
    
        return {
          ...state,
          requestInProgress: false,
          requestError: null,
          customers: {
            result: [
              ...state.customers.result.filter(item => !action.payload.data.includes(item.id))
            ]
          }
        }
    case 'REQUEST_ERROR':
      return {
        ...state,
        requestInProgress: false,
        requestError: action.payload.requestError,
      };
    default:
      return state;
  }
}

const middleware = applyMiddleware(thunkMiddleware, logger);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

export default store;
