import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'
import table from './table'
import developmentTable from './developmentTable'
import featureToggle from './featureToggle'

const appReducer = combineReducers({
  baseData,
  prices,
  table,
  developmentTable,
  featureToggle,
})

export default appReducer
