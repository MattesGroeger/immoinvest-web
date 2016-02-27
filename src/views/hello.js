import React from 'react';
import { Link } from 'react-router';

export default class Hello extends React.Component {
  render() {
    return <div><h1>Hello</h1><Link to="/world">World</Link></div>
  }
}
