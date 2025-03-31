// import { redux } from 'redux'
const redux = require("redux")
const createStore = redux.createStore//redux.configureStore
const bindActionCreators = redux.bindActionCreators


const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1, // in redux the convention is to use a property called 'payload' for any additional information you want to send.
  };
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

const initialState = {
  numOfCake: 10,
};

// (previousState, action) => newState

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      }
    case CAKE_RESTOCKED:
        return {
            ...state,
            numOfCake: state.numOfCake + action.payload,
        }
    default:
      return state
  }
};

const store = createStore(reducer);
console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated State ", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));
// store.dispatch(orderCake());

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch) 
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

unsubscribe();


// Result:
// Initial State  { numOfCake: 10 }
// Updated State  { numOfCake: 9 }
// Updated State  { numOfCake: 8 }
// Updated State  { numOfCake: 7 }
// Updated State  { numOfCake: 10 }