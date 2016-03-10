export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'
export const CALCULATE_PRICES = 'CALCULATE_PRICES'
export const CALCULATE_TABLE = 'CALCULATE_TABLE'
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

function calculateTable(baseData, prices) {
  return {
    type: CALCULATE_TABLE,
    baseData: baseData,
    prices: prices
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
    dispatch(calculateTable(getState().baseData, getState().prices))
    dispatch(toggleFeatures(getState().baseData))
  }
}
