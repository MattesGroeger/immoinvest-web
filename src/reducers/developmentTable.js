import { CALCULATE_DEVELOPTMENT_TABLE } from '../actions/index'

const initialState = []

function calculateDevelopmentRows(data, baseRent, HOAFee, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const { inflationPercent, apportionableHOAFeePercent, costFactorPercent, yearlyRentIncrease } = data

  const newBaseRent = baseRent * (1.0 + yearlyRentIncrease)
  const newHOAFee = HOAFee * (1.0 + inflationPercent)
  const apportionableHOAFeePerMonth = newHOAFee * apportionableHOAFeePercent
  const nonApportionableHOAFeePerMonth = newHOAFee - apportionableHOAFeePerMonth
  const costPerMonth = newBaseRent * costFactorPercent

  const revenueYearly = newBaseRent * 12
  const costYearly = (nonApportionableHOAFeePerMonth + costPerMonth) * 12

  accumulator.push({
    revenueYearly: revenueYearly,
    costYearly: costYearly,
    profitYearly: revenueYearly - costYearly,
  })

  return calculateDevelopmentRows(data, newBaseRent, newHOAFee, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_DEVELOPTMENT_TABLE:
      const { baseRent, HOAFee, investmentPeriod } = action.baseData
      return calculateDevelopmentRows(action.baseData, baseRent, HOAFee, investmentPeriod)
    default:
      return state
  }
}
