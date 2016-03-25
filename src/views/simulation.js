import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { BaseData } from '../shapes/index'
import { changeBaseDataGrossPrice } from '../actions/index'
import { Grid, Row, Col, Accordion, Panel } from 'react-bootstrap'

import BaseDataForm from './parameters/baseData'
import IncidentalCostsForm from './parameters/incidentalCosts'
import FinancingForm from './parameters/financing'
import CashflowForm from './parameters/cashflow'
import DevelopmentForm from './parameters/development'
import TaxForm from './parameters/tax'

import KPIView from './results/kpi'
import GraphView from './results/graph'
import TableView from './results/table'

export default class Simulation extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={4} md={3}>
          <Accordion>
            <Panel header="Grunddaten" defaultExpanded={true}>
              <BaseDataForm/>
            </Panel>
            <Panel header="Nebenkosten" eventKey="2">
              <IncidentalCostsForm/>
            </Panel>
            <Panel header="Finanzierung" eventKey="3">
              <FinancingForm/>
            </Panel>
            <Panel header="Cashflow" eventKey="4">
              <CashflowForm/>
            </Panel>
            <Panel header="Wertentwicklung" eventKey="5">
              <DevelopmentForm/>
            </Panel>
            <Panel header="Steuern" eventKey="6">
              <TaxForm/>
            </Panel>
          </Accordion>
        </Col>
        <Col xs={14} md={9}>
          <KPIView/>
          <GraphView/>
          <TableView/>
        </Col>
      </Row>
    )
  }
}

// Steuern
// <ul>
//   <li>Grundstücksanteil in % oder €</li>
//   <li>Anteil nicht-umlagefähiger Kosten in % oder € (Instandhaltungskosten, Verwaltung, etc.)</li>
//   <li>Alleinstehen/Verheirated</li>
//   <li>Zu versteuerndes Einkommen in € (oder persönlicher Steuersatz in %?)</li>
//   <li>Haus- und Grundbesitzer-Haftpflichtversicherung?</li>
//   <li>Grundsteuer?</li>
// </ul>

// Wertentwicklung
// <ul>
//   <li>Anlagehorizont in Jahren</li>
//   <li>Wertentwicklung Bodenanteil pro Jahr in %</li>
//   <li>Wertentwicklung Wohnung pro Jahr in %</li>
// </ul>
