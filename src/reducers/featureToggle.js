import { TOGGLE_FEATURES } from '../actions/index'

const initialState = {
  incidentalCostsFeature: false,
  financingFeature: false
}

export default function prices(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FEATURES:
      const hasGrossPrice = action.baseData.grossPrice > 0
      return {
        incidentalCostsFeature: hasGrossPrice,
        financingFeature: hasGrossPrice,
        developmentFeature: hasGrossPrice,
        taxFeature: action.baseData.baseRent > 0,
      }
    default:
      return state
  }
}
