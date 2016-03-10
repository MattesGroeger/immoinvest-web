import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'
import table from './table'
import featureToggle from './featureToggle'

const appReducer = combineReducers({
  baseData,
  prices,
  table,
  featureToggle,
})

export default appReducer
