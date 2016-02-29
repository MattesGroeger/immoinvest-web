import { createStore } from 'redux'
import appReducer from '../reducers/index'

export default function createApplicationStore() {
  return createStore(appReducer)
}
