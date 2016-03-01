import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { BaseData } from '../shapes/index'
import { changeBaseDataGrossPrice } from '../actions/index'

import GraphView from './simulation/graph'
import BaseDataForm from './simulation/baseData'

class TableView extends React.Component {
  render() {
    return (<div>Coming Soon</div>)
  }
}

export default class Simulation extends React.Component {
  render() {
    return (
      <div>
        <h2>Diagramm/Berechnet</h2>
        <GraphView/>
        <h2>Basisdaten</h2>
        <BaseDataForm/>
        <h2>Tabelle</h2>
        <TableView/>
      </div>)
  }
}
