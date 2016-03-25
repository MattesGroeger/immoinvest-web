import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'
import table from './table'
import cashflowTable from './cashflowTable'
import taxTable from './taxTable'
import featureToggle from './featureToggle'

const appReducer = combineReducers({
  baseData,
  prices,
  table,
  cashflowTable,
  taxTable,
  featureToggle,
})

export default appReducer
