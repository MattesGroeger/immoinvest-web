import update from 'react-addons-update'

import { CALCULATE_FINANCING_TABLE } from '../actions/index'

const initialState = calculateTable(0)

function calculateTable(years, loan = 0, yearlyRate = 0, yearlyFollowUpRate = 0, fixedBorrowingRateYears = 0, borrowingRatePercent = 0, followUpBorrowingRatePercent = 0, specialYearlyPayment = 0) {
  let rows = Array.from(new Array(years), () => 0)

  return rows.reduce(function(acc, _elem, i, _array) {
    let dept = i == 0 ? loan : acc[i - 1].remainingDept
    acc.push(calculateRow(i, dept, yearlyRate, yearlyFollowUpRate, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment))
    return acc
  }, [])
}

function calculateRow(index, dept, yearlyRate, yearlyFollowUpRate, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment) {
  const year = index + 1
  const endOfFixedBorrowingRate = year > fixedBorrowingRateYears
  const effectiveYearlyRate = endOfFixedBorrowingRate ? yearlyFollowUpRate : yearlyRate
  const effectiveBorrowingRate = dept * (endOfFixedBorrowingRate ? followUpBorrowingRatePercent : borrowingRatePercent)
  const amortizationRateTemp = effectiveYearlyRate - effectiveBorrowingRate + specialYearlyPayment
  const amortizationRate = dept < amortizationRateTemp ? dept : amortizationRateTemp
  const totalRate = effectiveBorrowingRate + amortizationRate
  return {
    year: year,
    dept: dept,
    borrowingRate: effectiveBorrowingRate,
    amortizationRate: amortizationRate,
    totalRate: totalRate,
    remainingDept: dept - amortizationRate,
  }
}

function deptAfterYears(dept, years, yearlyRate, borrowingRatePercent, specialYearlyPayment) {
  function calculateDept(dept, currentYear, years, yearlyRate, borrowingRatePercent, specialYearlyPayment) {
    if (currentYear >= years) {
      return dept
    } else {
      const borrowingRate = dept * borrowingRatePercent
      const amortizationRateTemp = yearlyRate - borrowingRate + specialYearlyPayment
      const amortizationRate = dept < amortizationRateTemp ? dept : amortizationRateTemp
      return calculateDept(dept - amortizationRate, currentYear + 1, years, yearlyRate, borrowingRatePercent, specialYearlyPayment)
    }
  }
  return calculateDept(dept, 1, years, yearlyRate, borrowingRatePercent, specialYearlyPayment)
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_FINANCING_TABLE:
      const { fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment, investmentPeriod } = action.baseData
      const { loan, yearlyRate, yearlyFollowUpRate } = action.prices
      return calculateTable(investmentPeriod, loan || 0, yearlyRate || 0, yearlyFollowUpRate || 0, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment)
    default:
      return state
  }
}
