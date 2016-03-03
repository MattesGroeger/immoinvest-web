import update from 'react-addons-update'

import { CALCULATE_PRICES } from '../actions/index'

const initialState = {
  rentPerSquareMeter: 0,
  netPricePerSquareMeter: 0,
  incidentalCosts: 0,
  totalPrice: 0,
  purchasingPriceFactor: 0,
}

function calculateRentPerSquareMeter(baseRent, squareMeters) {
  return squareMeters > 0 ? baseRent / squareMeters : 0
}

function calculatePricePerSquareMeter(squareMeters, totalPrice) {
  return squareMeters > 0 ? totalPrice / squareMeters : 0
}

function calculateIncidentalCosts(grossPrice, commission, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent) {
  let commissionFraction = grossPrice * commission
  let notaryFraction = grossPrice * notaryCostPercent
  let landRegisterFraction = grossPrice * landRegisterCostPercent
  let transferTaxFraction = grossPrice * realEstateTransferTaxPercent
  return commissionFraction + notaryFraction + landRegisterFraction + transferTaxFraction
}

function calculateIncidentalCostsPercent(incidentalCosts, totalPrice) {
  return totalPrice > 0 ? incidentalCosts / totalPrice : 0
}

function calculatePurchasingPriceFactor(baseRent, grossPrice) {
  return baseRent > 0 ? grossPrice / (baseRent * 12) : 0
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PRICES:
      const { grossPrice, commission, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent, squareMeters, baseRent } = action.baseData
      const incidentalCosts = calculateIncidentalCosts(grossPrice, commission, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent)
      const totalPrice = grossPrice + incidentalCosts
      return {
        rentPerSquareMeter: calculateRentPerSquareMeter(baseRent, squareMeters),
        netPricePerSquareMeter: calculatePricePerSquareMeter(squareMeters, totalPrice),
        incidentalCosts: incidentalCosts,
        incidentalCostsPercent: calculateIncidentalCostsPercent(incidentalCosts, totalPrice),
        totalPrice: totalPrice,
        purchasingPriceFactor: calculatePurchasingPriceFactor(baseRent, grossPrice),
      }
    default:
      return state
  }
}
