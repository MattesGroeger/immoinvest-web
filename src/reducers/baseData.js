import { CHANGE_BASE_DATA_GROSS_PRICE } from '../actions/index'
import update from 'react-addons-update'

const initialState = {
  id: 0,
  grossPrice: 0
}

const baseData = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BASE_DATA_GROSS_PRICE:
      return update(state, {
        grossPrice: { $set: action.grossPrice }
      })
    default:
      return state
  }
}

export default baseData
