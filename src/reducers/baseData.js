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
  switch (action.property) {
    case "squareMeters":
      return update(state, {
        squareMeters: { $set: action.value }
      })
    case "grossPrice":
      return update(state, {
        grossPrice: { $set: action.value }
      })
    case "baseRent":
      return update(state, {
        baseRent: { $set: action.value}
      })
    case "HOAFee":
      return update(state, {
        HOAFee: { $set: action.value}
      })
    case "commission":
      return update(state, {
        commission: { $set: action.value}
      })
    default:
      return state
  }
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
