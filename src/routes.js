import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import ga from 'react-ga'

import App from './views/app'
import Simulation from './views/simulation'
import FAQ from './views/faq'
import Imprint from './views/imprint'

import createStore from './store/create'
import { changeBaseDataGrossPrice } from './actions/index'

const options = { debug: process.env.ENV !== 'production' }

ga.initialize(process.env.GA_TRACKING_ID, options)

const store = createStore()

const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => ga.pageview(location.pathname))

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Simulation}/>
        <Route path="simulation" component={Simulation}/>
        <Route path="faq" component={FAQ}/>
        <Route path="imprint" component={Imprint}/>
      </Route>
    </Router>
  </Provider>
)
