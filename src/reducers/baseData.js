import { CHANGE_BASE_DATA } from '../actions/index'
import update from 'react-addons-update'

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

const updateRentPerSquareMeter = (state) => {
  return update(state, {
    rentPerSquareMeter: { $set: state.squareMeters > 0 ? state.baseRent / state.squareMeters : 0 }
  })
}

const updatePricePerSquareMeter = (state) => {
  return update(state, {
    netPricePerSquareMeter: { $set: state.squareMeters > 0 ? (state.grossPrice + state.incidentalCosts) / state.squareMeters : 0 }
  })
}

const updateIncidentalCosts = (state) => {
  let commission = state.grossPrice * state.commission
  let notary = state.grossPrice * state.notaryCostPercent
  let landRegister = state.grossPrice * state.landRegisterCostPercent
  let transferTax = state.grossPrice * state.realEstateTransferTaxPercent
  let incidentalCosts = commission + notary + landRegister + transferTax
  return update(state, {
    incidentalCosts: { $set: incidentalCosts },
    totalPrice: { $set: state.grossPrice + incidentalCosts }
  })
}

const updatePurchasingPriceFactor = (state) => {
  return update(state, {
    purchasingPriceFactor: { $set: state.baseRent > 0 ? state.grossPrice / (state.baseRent * 12) : 0 }
  })
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
      var state = updateBaseData(state, action)
      state = updateRentPerSquareMeter(state)
      state = updateIncidentalCosts(state)
      state = updatePricePerSquareMeter(state)
      state = updatePurchasingPriceFactor(state)
      return state
    default:
      return state
  }
}

export default baseData
