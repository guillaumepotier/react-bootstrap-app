import Basil from 'basil.js'
import BasilList from 'basil.js/src/basil.list' // eslint-disable-line no-unused-vars

import {
  BASIL_NAMESPACE,
  BASIL_STORAGES,
  BASIL_COOKIES_DOMAIN
} from 'config'

const basil = new Basil({
  namespace: BASIL_NAMESPACE,
  storages: BASIL_STORAGES,
  domain: BASIL_COOKIES_DOMAIN
})

export default basil
