import { CALCULATE_DEVELOPTMENT_TABLE } from '../actions/index'

const initialState = []

function multiplyPercentForYear(value = 0, percent, year) {
  return value * Math.pow(1 + percent, year)
}

function calculateDevelopmentRows(data, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const { grossPrice, baseRent, inflationPercent, HOAFee, apportionableHOAFeePercent, costFactorPercent, yearlyRentIncrease } = data
  const currentYear = accumulator.length + 1

  const grossPriceAfterInflation = multiplyPercentForYear(grossPrice, inflationPercent, currentYear)
  const baseRentAfterIncrease = multiplyPercentForYear(baseRent, yearlyRentIncrease, currentYear)
  const HOAFeeAfterInflation = multiplyPercentForYear(HOAFee, inflationPercent, currentYear)

  const apportionableHOAFeePerMonth = HOAFeeAfterInflation * apportionableHOAFeePercent
  const nonApportionableHOAFeePerMonth = HOAFeeAfterInflation - apportionableHOAFeePerMonth
  const costPerYear = grossPriceAfterInflation * costFactorPercent

  const revenueYearly = baseRentAfterIncrease * 12
  const costYearly = (nonApportionableHOAFeePerMonth * 12) + costPerYear

  accumulator.push({
    revenueYearly: revenueYearly,
    costYearly: costYearly,
    profitYearly: revenueYearly - costYearly,
  })

  return calculateDevelopmentRows(data, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_DEVELOPTMENT_TABLE:
      return calculateDevelopmentRows(action.baseData, action.baseData.investmentPeriod)
    default:
      return state
  }
}
