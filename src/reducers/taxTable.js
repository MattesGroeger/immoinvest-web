import { CALCULATE_TAX_TABLE } from '../actions/index'
import wageTax from '../util/wageTax'
const initialState = []

function multiplyPercentForYear(value = 0, percent, year) {
  return value * Math.pow(1 + percent, year)
}

function afaPercent(taxType, currentYear) {
  switch (taxType) {
    case "new":
      return currentYear <= 40 ? 0.02 : 0
    case "oldFrom1925":
      return currentYear <= 50 ? 0.02 : 0
    case "oldBefore1925":
      return currentYear <= 40 ? 0.025 : 0
    default:
      return 0
  }
}

function afa(totalPrice, landPortionPercent, taxType, currentYear) {
  const afaPricePortion = totalPrice * (1 - landPortionPercent)
  return afaPricePortion * afaPercent(taxType, currentYear)
}

function calculateTaxRows(data, prices, financingTable, cashflowTable, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const { landPortionPercent, taxType, married, taxableYearlyIncome, incomeDevelopmentPercent } = data
  const currentYear = accumulator.length + 1

  const revenueYear = cashflowTable[accumulator.length].revenueYearly
  const depreciationYearly = revenueYear > 0 ? afa(prices.totalPrice || 0, landPortionPercent, taxType, currentYear) : 0
  const borrowingRate = revenueYear > 0 ? financingTable[accumulator.length].borrowingRate : 0

  const taxableIncomeYearly = Math.max(multiplyPercentForYear(taxableYearlyIncome, incomeDevelopmentPercent, currentYear), 0)
  const totalTaxableIncomeYearly = taxableIncomeYearly + revenueYear - depreciationYearly - borrowingRate

  const wageTaxIncome = wageTax(taxableIncomeYearly)
  const wageTaxTotalIncome = wageTax(totalTaxableIncomeYearly)
  const differenceYearly = wageTaxIncome - wageTaxTotalIncome

  accumulator.push({
    depreciationYearly: depreciationYearly,
    taxableIncomeYearly: taxableIncomeYearly,
    totalTaxableIncomeYearly: totalTaxableIncomeYearly,
    differenceYearly: differenceYearly
  })

  return calculateTaxRows(data, prices, financingTable, cashflowTable, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_TAX_TABLE:
      return calculateTaxRows(action.baseData, action.prices, action.financingTable, action.cashflowTable, action.baseData.investmentPeriod)
    default:
      return state
  }
}
