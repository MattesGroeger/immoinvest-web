import { CALCULATE_PROFIT_TABLE } from '../actions/index'

const initialState = []

function calculateProfitRows(cashflowTable, financingTable, taxTable, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const currentYear = accumulator.length + 1

  const revenueYearly = cashflowTable[accumulator.length].revenueYearly
  const costYearly = cashflowTable[accumulator.length].costYearly
  const financingCostYearly = financingTable[accumulator.length].totalRate
  const taxYearly = taxTable[accumulator.length].differenceYearly

  accumulator.push({
    profitYearly: revenueYearly - costYearly - financingCostYearly + taxYearly,
  })

  return calculateProfitRows(cashflowTable, financingTable, taxTable, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PROFIT_TABLE:
      return calculateProfitRows(action.cashflowTable, action.financingTable, action.taxTable, action.baseData.investmentPeriod)
    default:
      return state
  }
}
