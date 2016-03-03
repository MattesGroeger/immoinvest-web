import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import appReducer from '../reducers/index'

const middleware = [
  thunkMiddleware
]

const logger = createLogger({
  collapsed: true,
  logger: console,
})

middleware.push(logger)

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default function createApplicationStore(initialData = {}) {
  return createStoreWithMiddleware(appReducer, initialData)
}
