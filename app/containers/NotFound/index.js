import React from 'react'
import { Link } from 'react-router-dom'

import { _t } from 'i18n'

export default function NotFound () {
  return (
    <div className='AppPage'>
      <div className='AppPage-body'>
        <div className='u-tac'>
          <h3 className='t-error'>{_t('Page not found...')}</h3>
          <Link className='NotFound-goback' to='/'>{_t('Go back to home page')}</Link>
        </div>
      </div>
    </div>
  )
}
