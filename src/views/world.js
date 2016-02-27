import React from 'react';
import { Link } from 'react-router';

export default class World extends React.Component {
  render() {
    return <div><h1>World</h1><Link to="/hello">Hello</Link></div>
  }
}
