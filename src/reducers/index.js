import { combineReducers } from 'redux'

import baseData from './baseData'
import prices from './prices'

const appReducer = combineReducers({
  baseData,
  prices
})

export default appReducer
