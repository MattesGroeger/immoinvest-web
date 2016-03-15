import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'
import table from './table'
import cashflowTable from './cashflowTable'
import featureToggle from './featureToggle'

const appReducer = combineReducers({
  baseData,
  prices,
  table,
  cashflowTable,
  featureToggle,
})

export default appReducer
