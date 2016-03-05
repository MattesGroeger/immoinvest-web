export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'
export const CALCULATE_PRICES = 'CALCULATE_PRICES'
export const CALCULATE_TABLE = 'CALCULATE_TABLE'

function setBaseData(property, value) {
  return {
    type: CHANGE_BASE_DATA,
    property: property,
    value: value
  }
}

function calculatePrices(baseData) {
  return {
    type: CALCULATE_PRICES,
    baseData: baseData
  }
}

function calculateTable(baseData, prices) {
  return {
    type: CALCULATE_TABLE,
    baseData: baseData,
    prices: prices
  }
}

export function changeBaseData(property, value) {
  return (dispatch, getState) => {
    dispatch(setBaseData(property, value))
    dispatch(calculatePrices(getState().baseData))
    dispatch(calculateTable(getState().baseData, getState().prices))
  }
}
