import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>App</h1>
          <ul>
            <li><Link to="/simulation">Simulation</Link></li>
            <li><Link to="/world">World</Link></li>
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}
