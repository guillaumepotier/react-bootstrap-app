import {
  createStore,
  applyMiddleware,
  compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import createReducer from './reducers'

// Create saga middleware
import createSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

/**
 * configureStore
 *
 * Creates the Redux store and returns it.
 */
function configureStore (initialState = {}) {
  // Declare store middlewares
  // Only sagaMiddleware for now
  const middlewares = [
    sagaMiddleware
  ]

  // Declare enhancers for our store
  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  // If Redux DevTools Extension is installed, use it
  // Download link: https://github.com/zalmoxisus/redux-devtools-extension
  const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

  // Enhancers will be composed with either the redux devtools (development)
  // Or with the native `compose` function from Redux
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    reduxDevtoolsExtension ? reduxDevtoolsExtension : compose

  // Create the main reducer from all containers reducers combined together
  let mainReducer = createReducer()

  const store = createStore(
    mainReducer,
    initialState,
    composeEnhancers(...enhancers)
  )

  // Tell redux saga to use all our sagas
  sagaMiddleware.run(createSaga)

  // @TODO: Here, make hot module reloading
  // if (module.hot) {
  //   module.hot.accept(`./reducers`, () => {
  //     mainReducer = require(`./reducers`).createReducer()
  //     store.replaceReducer(mainReducer)
  //   })
  // }

  return store
}

/**
 *
 * Create Redux Store and export it to be able to use it later
 * We can add an initial state as first argument if needed
 *
 */
const store = configureStore()

export default store
