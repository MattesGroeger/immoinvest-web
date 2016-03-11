import React from 'react'
import { render } from 'react-dom'

import Router from './routes';

if (process.env.ENV === 'production') {
  amplitude.init("b394c3c7237d0356f3f2f2a0f1802d4f")
}
//  else {
//   amplitude.init("2931ae77475ddfe3affa319a2bffbdbe")
// }

amplitude.logEvent('startup')

render(Router, document.getElementById('app'))
