import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import App from './views/app'
import Simulation from './views/simulation'
import FAQ from './views/faq'
import Imprint from './views/imprint'

import createStore from './store/create'
import { changeBaseDataGrossPrice } from './actions/index'

const store = createStore()

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Simulation}/>
        <Route path="simulation" component={Simulation}/>
        <Route path="faq" component={FAQ}/>
        <Route path="imprint" component={Imprint}/>
      </Route>
    </Router>
  </Provider>
)
