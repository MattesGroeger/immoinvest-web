import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'
import table from './table'

const appReducer = combineReducers({
  baseData,
  prices,
  table,
})

export default appReducer
