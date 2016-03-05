import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { BaseData } from '../shapes/index'
import { changeBaseDataGrossPrice } from '../actions/index'

import GraphView from './simulation/graph'
import BaseDataForm from './simulation/baseData'
import IncidentalCostsForm from './simulation/incidentalCosts'
import FinancingForm from './simulation/financing'
import TableView from './simulation/table'

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
        <h3>Finanzierung</h3>
        <FinancingForm/>
        <h3>Steuern</h3>
        <ul>
          <li>Grundstücksanteil in % oder €</li>
          <li>Anteil nicht-umlagefähiger Kosten in % oder € (Instandhaltungskosten, Verwaltung, etc.)</li>
          <li>Alleinstehen/Verheirated</li>
          <li>Zu versteuerndes Einkommen in € (oder persönlicher Steuersatz in %?)</li>
        </ul>
        <h3>Wertentwicklung</h3>
        <ul>
          <li>Anlagehorizont in Jahren</li>
          <li>Pauschale für Mietausfall</li>
          <li>Geschätzte Mietsteigerung/Jahr in %</li>
          <li>Geschätzte Kostensteigerung/Jahr in %</li>
          <li>Inflation pro Jahr in %</li>
          <li>Wertentwicklung Bodenanteil pro Jahr in %</li>
          <li>Wertentwicklung Wohnung pro Jahr in %</li>
        </ul>
        <h2>Tabelle</h2>
        <TableView/>
      </div>)
  }
}
