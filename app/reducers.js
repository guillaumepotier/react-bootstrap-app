import { combineReducers } from 'redux'

import application from 'core/reducers/application'

// Returns the main reducer used in the app
export default function createReducer () {
  return combineReducers({

    application

  })
}
