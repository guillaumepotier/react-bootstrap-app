import { detect } from 'detect-browser'

const browserInfo = () => {
  const detected = detect()
  const { version } = detected || {}

  return {
    ...detected,
    versionString: version,
    version: parseInt(version || 0, 10),
    locale: (navigator.language || navigator.userLanguage).split(`-`)[0]
  }
}

const defaultState = {
  browserInfo: browserInfo()
}

export default function applicationReducer (state = defaultState, action) {
  return state
}
