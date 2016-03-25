import { CALCULATE_PROFIT_TABLE } from '../actions/index'

const initialState = []

function calculateProfitRows(cashflowTable, financingTable, taxTable, equity, totalRows = 0, accumulator = [], gain = 0, loss = 0) {
  if (accumulator.length >= totalRows) { return accumulator }

  const currentYear = accumulator.length + 1

  const revenueYearly = cashflowTable[accumulator.length].revenueYearly
  const costYearly = cashflowTable[accumulator.length].costYearly
  const financingCostYearly = financingTable[accumulator.length].totalRate
  const taxYearly = taxTable[accumulator.length].differenceYearly

  const profitYearly = revenueYearly - costYearly - financingCostYearly + taxYearly
  const newGain = gain + (profitYearly > 0 ? profitYearly : 0)
  const newLoss = loss + (profitYearly < 0 ? profitYearly * -1 : 0)
  const roi = profitYearly / equity

  accumulator.push({
    profitYearly: profitYearly,
    totalGain: newGain,
    totalLoss: equity + newLoss,
    roi: roi,
  })

  return calculateProfitRows(cashflowTable, financingTable, taxTable, equity, totalRows, accumulator, newGain, newLoss)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PROFIT_TABLE:
      return calculateProfitRows(action.cashflowTable, action.financingTable, action.taxTable, action.prices.equity, action.baseData.investmentPeriod)
    default:
      return state
  }
}
