import update from 'react-addons-update'

import { CHANGE_BASE_DATA } from '../actions/index'

const initialState = {
  squareMeters: 0,
  grossPrice: 0,
  baseRent: 0,
  HOAFee: 0,

  commissionPercent: 0,
  realEstateTransferTaxPercent: 0.06,
  notaryCostPercent: 0.015,
  landRegisterCostPercent: 0.005,

  equityPercent: 0.1,
  fixedBorrowingRateYears: 15,
  borrowingRatePercent: 0.024,
  amortizationRatePercent: 0.02,
  followUpBorrowingRatePercent: 0.06,
  specialYearlyPayment: 0,
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
