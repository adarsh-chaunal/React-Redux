// import { redux } from 'redux'
const redux = require("redux")
const createStore = redux.createStore//redux.configureStore

const CAKE_ORDERED = "CAKE_ORDERED"

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
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
    default:
      return state
  }
};

const store = createStore(reducer);
console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated State ", store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();

store.dispatch(orderCake());
store.dispatch(orderCake());


// Result:
// Initial State  { numOfCake: 10 }
// Updated State  { numOfCake: 9 }
// Updated State  { numOfCake: 8 }
// Updated State  { numOfCake: 7 }