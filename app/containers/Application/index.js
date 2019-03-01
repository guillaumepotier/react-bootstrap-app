import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import moment from 'moment'
import flow from 'lodash/flow'

import i18n from 'i18n'

import {
  localeSelector,
  browserInfoSelector
} from 'core/selectors'

import Hero from 'containers/Hero'
import NotFound from 'containers/NotFound'

import frenchDictionnary from 'assets/i18n/fr.json'

class Application extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      locale: null
    }
  }

  componentDidMount () {
    const { name, version, locale } = this.props.browserInfo

    document.body.classList.add(`Browser-${name}`)
    document.body.classList.add(`Browser-${name}-${version}`)

    if (window.location.hash === '#embed') {
      document.body.classList.add('is-embedded')
    }

    this.updateLocale(locale)
  }

  updateLocale (locale) {
    if (locale === this.state.locale) {
      return
    }

    // changing language here by taking the state to reload full App subcomponents
    // state will change with eventlistener used for selecting language
    this.loadLocale(locale)
    this.setState({ locale })
  }

  loadLocale (locale) {
    switch (locale) {
      case 'fr':
        i18n.load(frenchDictionnary)
        moment.locale('fr')
        break
      default:
        i18n.default()
        moment.locale('en')
    }
  }

  render () {
    return <React.Fragment>
      <Switch>
        <Route exact path='/' component={Hero} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  }
}

function mapStateToProps (state) {
  return {
    locale: localeSelector(state),
    browserInfo: browserInfoSelector(state),
    user: {}
  }
}

export default flow(
  connect(mapStateToProps),
  withRouter
)(Application)
