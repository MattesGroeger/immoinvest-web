import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './views/app';
import Hello from './views/hello';
import World from './views/world';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Hello}/>
      <Route path="hello" component={Hello}/>
      <Route path="world" component={World}/>
    </Route>
  </Router>
);
