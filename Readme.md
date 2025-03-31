# REACT REDUX

Add 'package.json' to the folder
```npm init --yes```

Install Redux
```npm install redux```

Three Core Concepts
- Store (Shop: Hold the state)
> The global state of your application is stored at an object inside a single store.
>> Maintain our application state in a single object which would be managed by the Redux store.
```{```
```    numberOfCakes: 10``` 
```}```
- Action (Cake order: Describe what happened)
> The only way to change the state is to dispatch an action, an object that describes what happened.
>> To update the state of your app, you need to let Redux know about that with an action.
>> Not allowed to directly update the state object.
```{```
```    type: 'CAKE_ORDERED'```
```}```
- Reducer (Shopkeeper: Ties he store and the action together)
> To specify how the state tree is updated based on actions, you write pure reducers
>> Pure Reducers are pure functions that takes previous states and action as input and returns new state.
Recucer - (previousState, action) => newState
```const reducer = (state = initialState, action) => {```
```    switch (action.type){```
```        case CAKE_ORDERED:```
```            return {```
```                numberOfCakes: state.numOfCakes - 1```
```            }```
```    }```
```}```





## Redux store
- One store for the entire application
- Responsibilities
> Holds application state
> Allows access to state via **getState()**
> Allows state to be updated via **dispatch(action)**
> Registers listners via **subscribe(listner)**. listner is a function that is called when a state is changed
> Handles unregistering(unsubscribing) of listners via the function returned by **subscriber(listner)**


## createStore(reducer, preloadedState?, enhancer?)
Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
>Instead, you should use the ```configureStore``` method from our official Redux Toolkit package, which wraps ```createStore``` to provide a better default setup and configuration approach. You should also use Redux Toolkit's ```createSlice``` method for writing reducer logic.

## bindActionCreators(actionCreators, dispatch)
bindActionCreators function turns an object (whos values are action creators) into an object with the same keys but every action creator wraped into a dispatch call that they may be invoked directly.

```const actions = bindActionCreators({``` ```orderCake, restockCake }, store.dispatch)``` 
```actions.orderCake()```
```actions.orderCake()```
```actions.orderCake()```
```actions.restockCake(3)```

is same as

```store.dispatch(orderCake());```
```store.dispatch(orderCake());```
```store.dispatch(orderCake());```
```store.dispatch(restockCake(3));```

