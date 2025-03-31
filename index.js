// import { redux } from 'redux'
const redux = require("redux");
const createStore = redux.createStore; //redux.configureStore
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1, // in redux the convention is to use a property called 'payload' for any additional information you want to send.
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// }

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// (previousState, action) => newState

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// const store = createStore(reducer);
const store = createStore(rootReducer);
console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated State ", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));
// store.dispatch(orderCake());

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();

// Result without combineReducer:
// Initial State  { numOfCakes: 10, numOfIceCreams: 20 }
// Updated State  { numOfCakes: 9, numOfIceCreams: 20 }
// Updated State  { numOfCakes: 8, numOfIceCreams: 20 }
// Updated State  { numOfCakes: 7, numOfIceCreams: 20 }
// Updated State  { numOfCakes: 10, numOfIceCreams: 20 }
// Updated State  { numOfCakes: 10, numOfIceCreams: 19 }
// Updated State  { numOfCakes: 10, numOfIceCreams: 18 }
// Updated State  { numOfCakes: 10, numOfIceCreams: 20 }

// Result with combineReducer:
// Initial State  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
// Updated State  { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }
// Updated State  { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 20 } }
// Updated State  { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 20 } }
// Updated State  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }        
// Updated State  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 19 } }        
// Updated State  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 18 } }        
// Updated State  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } } 
