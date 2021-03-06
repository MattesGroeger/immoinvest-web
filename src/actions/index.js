export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'
export const CALCULATE_PRICES = 'CALCULATE_PRICES'
export const CALCULATE_FINANCING_TABLE = 'CALCULATE_FINANCING_TABLE'
export const CALCULATE_CASHFLOW_TABLE = 'CALCULATE_CASHFLOW_TABLE'
export const CALCULATE_TAX_TABLE = 'CALCULATE_TAX_TABLE'
export const CALCULATE_DEVELOPMENT_TABLE = 'CALCULATE_DEVELOPMENT_TABLE'
export const CALCULATE_PROFIT_TABLE = 'CALCULATE_PROFIT_TABLE'
export const TOGGLE_FEATURES = 'TOGGLE_FEATURES'

function setBaseData(key, value) {
  return {
    type: CHANGE_BASE_DATA,
    key: key,
    value: value
  }
}

function calculatePrices(baseData) {
  return {
    type: CALCULATE_PRICES,
    baseData: baseData
  }
}

function calculateFinancingTable(baseData, prices) {
  return {
    type: CALCULATE_FINANCING_TABLE,
    baseData: baseData,
    prices: prices
  }
}

function calculateCashflowTable(baseData) {
  return {
    type: CALCULATE_CASHFLOW_TABLE,
    baseData: baseData
  }
}

function calculateTaxTable(baseData, prices, financingTable, cashflowTable) {
  return {
    type: CALCULATE_TAX_TABLE,
    baseData: baseData,
    prices: prices,
    financingTable: financingTable,
    cashflowTable: cashflowTable
  }
}

function calculateDevelopmentTable(baseData) {
  return {
    type: CALCULATE_DEVELOPMENT_TABLE,
    baseData: baseData,
  }
}

function calculateProfitTable(baseData, prices, financingTable, cashflowTable, taxTable) {
  return {
    type: CALCULATE_PROFIT_TABLE,
    baseData: baseData,
    prices: prices,
    financingTable: financingTable,
    cashflowTable: cashflowTable,
    taxTable: taxTable,
  }
}

function toggleFeatures(baseData) {
  return {
    type: TOGGLE_FEATURES,
    baseData: baseData
  }
}

export function changeBaseData(key, value) {
  return (dispatch, getState) => {
    dispatch(setBaseData(key, value))
    dispatch(calculatePrices(getState().baseData))
    dispatch(calculateFinancingTable(getState().baseData, getState().prices))
    dispatch(calculateCashflowTable(getState().baseData))
    dispatch(calculateTaxTable(getState().baseData, getState().prices, getState().financingTable, getState().cashflowTable))
    dispatch(calculateDevelopmentTable(getState().baseData))
    dispatch(calculateProfitTable(getState().baseData, getState().prices, getState().financingTable, getState().cashflowTable, getState().taxTable))
    dispatch(toggleFeatures(getState().baseData))
  }
}
