import { CALCULATE_CASHFLOW_TABLE } from '../actions/index'

const initialState = []

function multiplyPercentForYear(value = 0, percent, year) {
  return value * Math.pow(1 + percent, year)
}

// Make sure the apportionableHOAFee is greater or equal the baseRent
// Example:
// BaseRent: 0€                 BaseRent: 200€                BaseRent: 100€
// HOAFee: 200€                 HOAFee: 200€                  HOAFee: 200€
// HOAFeePercent: 75%           HOAFeePercent: 75%            HOAFeePercent: 75%
// ApportionableHOAFee: 150€    ApportionableHOAFee: 150€     ApportionableHOAFee: 150€
// Result: 0€                   Result: 150€                  Result: 100€
function calculateApportionableHOAFeePerMonth(HOAFee, HOAFeePercent, baseRent) {
  return Math.min(baseRent, HOAFee * HOAFeePercent)
}

function calculateCashflowRows(data, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const { grossPrice, baseRent, inflationPercent, HOAFee, apportionableHOAFeePercent, costFactorPercent, yearlyRentIncrease } = data
  const currentYear = accumulator.length + 1

  const grossPriceAfterInflation = multiplyPercentForYear(grossPrice, inflationPercent, currentYear)
  const baseRentAfterIncrease = multiplyPercentForYear(baseRent, yearlyRentIncrease, currentYear)
  const HOAFeeAfterInflation = multiplyPercentForYear(HOAFee, inflationPercent, currentYear)

  const apportionableHOAFeePerMonth = calculateApportionableHOAFeePerMonth(HOAFeeAfterInflation, apportionableHOAFeePercent, baseRentAfterIncrease)
  const nonApportionableHOAFeePerMonth = HOAFeeAfterInflation - apportionableHOAFeePerMonth
  const costPerYear = grossPriceAfterInflation * costFactorPercent

  const revenueYearly = baseRentAfterIncrease * 12
  const costYearly = (nonApportionableHOAFeePerMonth * 12) + costPerYear

  accumulator.push({
    revenueYearly: revenueYearly,
    costYearly: costYearly,
  })

  return calculateCashflowRows(data, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_CASHFLOW_TABLE:
      return calculateCashflowRows(action.baseData, action.baseData.investmentPeriod)
    default:
      return state
  }
}
