import update from 'react-addons-update'

import { CHANGE_BASE_DATA } from '../actions/index'

const initialState = {
  // squareMeters: 0,
  // grossPrice: 0,
  // baseRent: 0,
  // HOAFee: 0,

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

  investmentPeriod: 40,
  inflationPercent: 0.02,
  apportionableHOAFeePercent: 0.65,
  costFactorPercent: 0.01,
  yearlyRentIncrease: 0.025,
  landPortionPercent: 0.25,
  landDevelopmentPercent: 0.02,
  flatDevelopmentPercent: -0.02,
}

const updateBaseData = (state, action) => {
  let obj = {}
  obj[action.key] = { $set: action.value }
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
