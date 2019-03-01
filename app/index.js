import 'react-hot-loader/patch'

import React from 'react'
import ReactDom from 'react-dom'

import { DEBUG_MODE } from 'config'

import moment from 'moment'
import basil from 'core/basil'

// import emitter from 'core/emitter'

import { AppContainer } from 'react-hot-loader'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

// Load Tapestry - import it first, beware of the CSS cascade :)
import 'core/styles/tapestry/_app.scss'

// Load Tippy style
import 'react-tippy/dist/tippy.css'

import Application from 'containers/Application'
import store from './store.js'

// Polyfills
import 'core/polyfills'

// Load the manifest.json into the app, and keep the name unchanged
import '!file-loader?name=[name].[ext]!assets/manifest.json'

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(Application)

if (module.hot) {
  module.hot.accept('./containers/Application', () => {
    const newApplication = require('./containers/Application').default
    render(newApplication)
  })
}

// expose moment, globalStore and actions in window for debugging purpose
if (DEBUG_MODE) {
  console.log('[debug mode on]')

  window.reactVersion = React.version

  window.basil = basil
  window.moment = moment
}
