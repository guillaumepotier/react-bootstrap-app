import React, { Component } from 'react'
import { connect } from 'react-redux'

import { _t } from 'i18n'

class Hero extends Component {
  render () {
    return <div>{_t('Hello')}</div>
  }
}

export default connect()(Hero)
