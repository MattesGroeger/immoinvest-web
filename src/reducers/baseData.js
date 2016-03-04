import update from 'react-addons-update'

import { CHANGE_BASE_DATA } from '../actions/index'

const initialState = {
  id: 0,
  squareMeters: 0,
  grossPrice: 0,
  baseRent: 0,
  commission: 0,

  realEstateTransferTaxPercent: 0.06, // 6,0%
  notaryCostPercent: 0.015, // 1,5%
  landRegisterCostPercent: 0.005, // 0,5%
}

const updateBaseData = (state, action) => {
  let obj = {}
  obj[action.property] = { $set: action.value }
  return update(state, obj)
}

const baseData = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BASE_DATA:
      return updateBaseData(state, action)
    default:
      return state
  }
}

export default baseData
