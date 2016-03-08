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
  monthlyRate: 0,
  specialYearlyPaymentPercent: 0,
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

function calculateEquity(grossPrice, equityPercent, incidentalCosts) {
  return (grossPrice * equityPercent) + incidentalCosts
}

function calculateMonthlyRate(loan, borrowingRatePercent, amortizationRatePercent) {
  return loan * borrowingRatePercent + loan * amortizationRatePercent
}

function calculateSpecialYearlyPaymentPercent(loan, specialYearlyPayment) {
  return loan > 0 ? specialYearlyPayment / loan : 0
}



function calculateMonthlyFollowUpRate(loan, fixedBorrowingRateYears, monthlyRate, borrowingRatePercent, amortizationRatePercent, specialYearlyPayment, followUpBorrowingRatePercent) {
  function calculateDept(dept, currentYear, fixedBorrowingRateYears, monthlyRate, borrowingRatePercent, specialYearlyPayment) {
    if (currentYear >= fixedBorrowingRateYears) {
      return dept
    } else {
      const borrowingRate = dept * borrowingRatePercent
      const amortizationRateTemp = monthlyRate - borrowingRate + specialYearlyPayment
      const amortizationRate = dept < amortizationRateTemp ? dept : amortizationRateTemp
      return calculateDept(dept - amortizationRate, currentYear + 1, fixedBorrowingRateYears, monthlyRate, borrowingRatePercent, specialYearlyPayment)
    }
  }
  const deptAfterYears = calculateDept(loan, 1, fixedBorrowingRateYears, monthlyRate, borrowingRatePercent, specialYearlyPayment)
  return deptAfterYears * followUpBorrowingRatePercent + deptAfterYears * amortizationRatePercent
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PRICES:
      const {
        squareMeters,
        grossPrice,
        baseRent,

        commissionPercent,
        realEstateTransferTaxPercent,
        notaryCostPercent,
        landRegisterCostPercent,

        equityPercent,
        fixedBorrowingRateYears,
        borrowingRatePercent,
        amortizationRatePercent,
        followUpBorrowingRatePercent,
        specialYearlyPayment } = action.baseData
      const incidentalCosts = calculateIncidentalCosts(grossPrice, commissionPercent, notaryCostPercent, landRegisterCostPercent, realEstateTransferTaxPercent)
      const totalPrice = grossPrice + incidentalCosts
      const equity = calculateEquity(grossPrice, equityPercent.value, incidentalCosts)
      const loan = totalPrice - equity
      const monthlyRate = calculateMonthlyRate(loan, borrowingRatePercent.value, amortizationRatePercent.value)
      return {
        rentPerSquareMeter: calculateRentPerSquareMeter(baseRent, squareMeters),
        netPricePerSquareMeter: calculatePricePerSquareMeter(squareMeters, totalPrice),
        incidentalCosts: incidentalCosts,
        incidentalCostsPercent: calculateIncidentalCostsPercent(incidentalCosts, totalPrice),
        totalPrice: totalPrice,
        purchasingPriceFactor: calculatePurchasingPriceFactor(baseRent, grossPrice),
        equity: equity,
        loan: loan,
        monthlyRate: monthlyRate,
        monthlyFollowUpRate: calculateMonthlyFollowUpRate(loan, fixedBorrowingRateYears.value, monthlyRate, borrowingRatePercent.value, amortizationRatePercent.value, specialYearlyPayment.value, followUpBorrowingRatePercent.value),
        specialYearlyPaymentPercent: calculateSpecialYearlyPaymentPercent(loan, specialYearlyPayment.value),
      }
    default:
      return state
  }
}
