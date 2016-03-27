import update from 'react-addons-update'

import { CALCULATE_FINANCING_TABLE } from '../actions/index'

const initialState = []

function roundCurrency(value) {
  return Math.round(value * 100) / 100
}

function calculateMonthlyRate(dept, monthlyRate, monthlyBorrowingRatePercent) {
  const borrowingRate = roundCurrency(dept * monthlyBorrowingRatePercent)
  const amortizationRate = Math.min(dept, roundCurrency(monthlyRate - borrowingRate)) // handle last rate
  return {
    borrowingRate: borrowingRate,
    amortizationRate: amortizationRate,
    totalRate: dept > amortizationRate ? monthlyRate : borrowingRate + amortizationRate,
    remainingDept: roundCurrency(dept - amortizationRate)
  }
}

function calculateMonthlyRates(dept, monthlyRate, monthlyBorrowingRatePercent) {
  return Array(12).fill().reduce((prev) => {
    const remainingDept = (prev.length > 0) ? prev[prev.length-1].remainingDept : dept
    prev.push(calculateMonthlyRate(remainingDept, monthlyRate, monthlyBorrowingRatePercent))
    return prev
  }, [])
}

function calculateFinancingPeriod(dept, periodInYears, borrowingRatePercent, amortizationRatePercent, specialYearlyPayment) {
  const yearlyRate = roundCurrency(dept * (borrowingRatePercent + amortizationRatePercent))
  const monthlyRate = roundCurrency(yearlyRate / 12)
  const monthlyBorrowingRatePercent = borrowingRatePercent / 12

  return Array(periodInYears).fill().reduce((prev) => {
    const remainingDept = (prev.length > 0) ? prev[prev.length-1].remainingDept : dept
    const monthlyRates = calculateMonthlyRates(remainingDept, monthlyRate, monthlyBorrowingRatePercent)
    const borrowingRate = monthlyRates.reduce((prev, current) => prev + current.borrowingRate, 0)
    const amortizationRate = monthlyRates.reduce((prev, current) => prev + current.amortizationRate, 0)
    const totalRate = yearlyRate + specialYearlyPayment
    prev.push({
      dept: remainingDept,
      months: monthlyRates,
      borrowingRate: roundCurrency(borrowingRate),
      amortizationRate: roundCurrency(amortizationRate),
      specialYearlyPayment: specialYearlyPayment,
      totalRate: remainingDept > amortizationRate ? roundCurrency(totalRate) : borrowingRate + amortizationRate + specialYearlyPayment,
      remainingDept: roundCurrency(remainingDept - amortizationRate - specialYearlyPayment),
    })
    return prev
  }, [])
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_FINANCING_TABLE:
      const { fixedBorrowingRateYears, borrowingRatePercent, amortizationRatePercent, followUpBorrowingRatePercent, specialYearlyPayment, investmentPeriod } = action.baseData
      const { loan } = action.prices

      const resultsPeriod1 = calculateFinancingPeriod(loan || 0, Math.min(investmentPeriod, fixedBorrowingRateYears), borrowingRatePercent, amortizationRatePercent, specialYearlyPayment)
      const resultsPeriod2 = calculateFinancingPeriod(resultsPeriod1[resultsPeriod1.length-1].remainingDept, Math.max(0, investmentPeriod - fixedBorrowingRateYears), followUpBorrowingRatePercent, amortizationRatePercent, 0)

      return resultsPeriod1.concat(resultsPeriod2)
    default:
      return state
  }
}
