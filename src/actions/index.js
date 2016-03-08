export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'
export const CALCULATE_PRICES = 'CALCULATE_PRICES'
export const CALCULATE_TABLE = 'CALCULATE_TABLE'

function setBaseData(key, subkey, value) {
  return {
    type: CHANGE_BASE_DATA,
    key: key,
    subkey: subkey,
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

export function changeBaseDataObject(key, subkey, value) {
  return (dispatch, getState) => {
    dispatch(setBaseData(key, subkey, value))
    dispatch(calculatePrices(getState().baseData))
    dispatch(calculateTable(getState().baseData, getState().prices))
  }
}

export function changeBaseData(key, value) {
  return changeBaseDataObject(key, undefined, value)
}
