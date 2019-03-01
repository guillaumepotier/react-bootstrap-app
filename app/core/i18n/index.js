import Jed from 'jed'

import basil from 'core/basil'

const DEFAULT_LOCALE = `en`
const ALLOWED_LOCALES = [`en`, `fr`]

class I18n {
  constructor () {
    this.jed = new Jed({})
  }

  translate (arg) {
    return this.jed.translate(arg)
  }

  load (json) {
    this.jed = new Jed(json)
  }

  default () {
    this.jed = new Jed({})
  }
}

function replace (string, replacements) {
  for (let key in replacements) {
    string = string.replace(new RegExp(`{${key}}`, 'gi'), replacements[key])
  }

  return string
}

const i18n = new I18n()

/*
* I18nTranslate('key')
* I18nTranslate('key {dog} foo', { dog })
* I18nTranslate('key {count} {dog}', 'plural {count} {dog}', count, { dog, count })
*/
export function I18nTranslate (...args) {
  let value = i18n.translate(args[0])

  if (args.length > 2) {
    value = value.ifPlural(args[2], args[1]).fetch(args[2])

    return args.length === 4 ? replace(value, args[3]) : value
  }

  value = value.fetch()

  return args.length === 2 ? replace(value, args[1]) : value
}

export function getLocale (user = { lang: null }, navigator = window.navigator) {
  const locale = user.lang || basil.get('user:locale') || navigator.language || navigator.userLanguage

  if (ALLOWED_LOCALES.indexOf(locale) === -1) {
    return DEFAULT_LOCALE
  }

  return locale
}

export function setLocale (locale) {
  basil.set('user:locale', locale)
}

export default i18n

export function _t () {
  return I18nTranslate(...arguments)
}

export function _n () {
  return I18nTranslate(...arguments)
}
