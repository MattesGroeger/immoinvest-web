import update from 'react-addons-update'

import { CALCULATE_PRICES } from '../actions/index'

const initialState = {
  rentPerSquareMeter: 0,
  netPricePerSquareMeter: 0,
  incidentalCosts: 0,
  incidentalCostsPercent: 0,
  totalPrice: 0,
  purchasingPriceFactor: 0,
  equity: 0,
  loan: 0,
}

function calculateRentPerSquareMeter(baseRent, squareMeters) {
  return squareMeters > 0 ? baseRent / squareMeters : 0
}

function calculatePricePerSquareMeter(squareMeters, totalPrice) {
  return squareMeters > 0 ? totalPrice / squareMeters : 0
}

function calculateIncidentalCosts(grossPrice, commissionPercent, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent) {
  let commissionFraction = grossPrice * commissionPercent
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

function calculateEquity(totalPrice, equityPercent) {
  return totalPrice * equityPercent
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PRICES:
      const { grossPrice, commissionPercent, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent, squareMeters, baseRent, equityPercent } = action.baseData
      const incidentalCosts = calculateIncidentalCosts(grossPrice, commissionPercent, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent)
      const totalPrice = grossPrice + incidentalCosts
      const equity = calculateEquity(totalPrice, equityPercent)
      const loan = totalPrice - equity
      return {
        rentPerSquareMeter: calculateRentPerSquareMeter(baseRent, squareMeters),
        netPricePerSquareMeter: calculatePricePerSquareMeter(squareMeters, totalPrice),
        incidentalCosts: incidentalCosts,
        incidentalCostsPercent: calculateIncidentalCostsPercent(incidentalCosts, totalPrice),
        totalPrice: totalPrice,
        purchasingPriceFactor: calculatePurchasingPriceFactor(baseRent, grossPrice),
        equity: equity,
        loan: loan,
      }
    default:
      return state
  }
}
