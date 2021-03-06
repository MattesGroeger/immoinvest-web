import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import baseData from './baseData'
import prices from './prices'
import financingTable from './financingTable'
import cashflowTable from './cashflowTable'
import taxTable from './taxTable'
import developmentTable from './developmentTable'
import profitTable from './profitTable'
import featureToggle from './featureToggle'

const appReducer = combineReducers({
  baseData,
  prices,
  financingTable,
  cashflowTable,
  taxTable,
  developmentTable,
  profitTable,
  featureToggle,
  routing: routerReducer,
})

export default appReducer
