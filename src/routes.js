import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import App from './views/app'
import Simulation from './views/simulation'
import World from './views/world'

import createStore from './store/create'
import { changeBaseDataGrossPrice } from './actions/index'

const store = createStore()

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Simulation}/>
        <Route path="simulation" component={Simulation}/>
        <Route path="world" component={World}/>
      </Route>
    </Router>
  </Provider>
)
