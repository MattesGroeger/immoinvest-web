import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { BaseData } from '../shapes/index'
import { changeBaseDataGrossPrice } from '../actions/index'

import GraphView from './simulation/graph'
import BaseDataForm from './simulation/baseData'
import IncidentalCostsForm from './simulation/incidentalCosts'

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
        <h2>Parameter</h2>
        <h3>Kerndaten</h3>
        <BaseDataForm/>
        <h3>Nebenkosten</h3>
        <IncidentalCostsForm/>
        <h3>Wertentwicklung</h3>
        <ul>
          <li>Anteil nicht-umlagefähiger Kosten in % oder € (Instandhaltungskosten, Verwaltung, etc.)</li>
          <li>Pauschale für Mietausfall</li>
          <li>Geschätzte Mietsteigerung/Jahr in %</li>
          <li>Geschätzte Kostensteigerung/Jahr in %</li>
        </ul>
        <h3>Finanzierung</h3>
        <ul>
          <li>Eigenkapital in % oder €</li>
          <li>Zinsbindung in Jahren</li>
          <li>Zinssatz in %</li>
          <li>Tilgungssatz in %</li>
          <li>Anschlusszinssatz in %</li>
        </ul>
        <h3>Steuern</h3>
        <ul>
          <li>Grundstücksanteil in % oder €</li>
          <li>Alleinstehen/Verheirated</li>
          <li>Zu versteuerndes Einkommen in €</li>
        </ul>
        <h3>Rendite</h3>
        <h2>Tabelle</h2>
        <TableView/>
      </div>)
  }
}
