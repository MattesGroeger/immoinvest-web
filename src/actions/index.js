export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'
export const CALCULATE_PRICES = 'CALCULATE_PRICES'

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

export function changeBaseData(property, value) {
  return (dispatch, getState) => {
    dispatch(setBaseData(property, value))
    dispatch(calculatePrices(getState().baseData))
  }
}
