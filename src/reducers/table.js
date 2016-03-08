import update from 'react-addons-update'

import { CALCULATE_TABLE } from '../actions/index'

const initialState = calculateTable(40)

function calculateTable(years, loan = 0, monthlyRate = 0, monthlyFollowUpRate = 0, fixedBorrowingRateYears = 0, borrowingRatePercent = 0, followUpBorrowingRatePercent = 0, specialYearlyPayment = 0) {
  let rows = Array.from(new Array(years), () => 0)

  return rows.reduce(function(acc, _elem, i, _array) {
    let dept = i == 0 ? loan : acc[i - 1].remainingDept
    acc.push(calculateRow(i, dept, monthlyRate, monthlyFollowUpRate, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment))
    return acc
  }, [])
}

function calculateRow(index, dept, monthlyRate, monthlyFollowUpRate, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment) {
  const year = index + 1
  const endOfFixedBorrowingRate = year > fixedBorrowingRateYears
  const effectiveMonthlyRate = endOfFixedBorrowingRate ? monthlyFollowUpRate : monthlyRate
  const effectiveBorrowingRate = dept * (endOfFixedBorrowingRate ? followUpBorrowingRatePercent : borrowingRatePercent)
  const amortizationRateTemp = effectiveMonthlyRate - effectiveBorrowingRate + specialYearlyPayment
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

function deptAfterYears(dept, years, monthlyRate, borrowingRatePercent, specialYearlyPayment) {
  function calculateDept(dept, currentYear, years, monthlyRate, borrowingRatePercent, specialYearlyPayment) {
    if (currentYear >= years) {
      return dept
    } else {
      const borrowingRate = dept * borrowingRatePercent
      const amortizationRateTemp = monthlyRate - borrowingRate + specialYearlyPayment
      const amortizationRate = dept < amortizationRateTemp ? dept : amortizationRateTemp
      return calculateDept(dept - amortizationRate, currentYear + 1, years, monthlyRate, borrowingRatePercent, specialYearlyPayment)
    }
  }
  return calculateDept(dept, 1, years, monthlyRate, borrowingRatePercent, specialYearlyPayment)
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_TABLE:
      const { fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, specialYearlyPayment } = action.baseData
      const { loan, monthlyRate, monthlyFollowUpRate } = action.prices
      return calculateTable(40, loan, monthlyRate, monthlyFollowUpRate, fixedBorrowingRateYears.value, borrowingRatePercent.value, followUpBorrowingRatePercent.value, specialYearlyPayment.value)
    default:
      return state
  }
}
