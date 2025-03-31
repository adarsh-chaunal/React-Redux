const redux = require("redux");
const produce = require("immer").produce;

const createStore = redux.createStore;

const initialState = {
  name: "Adarsh",
  address: {
    street: "Sector 71",
    city: "Mohali",
    state: "PB",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
        // return {
        //   ...state,
        //   address: {
        //     ...state.address,
        //     street: action.payload,
        //   },
        // };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Update State: ", store.getState());
});

store.dispatch(updateStreet("Sector 74"));

unsubscribe();
