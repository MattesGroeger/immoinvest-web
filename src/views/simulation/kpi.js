import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Table } from 'react-bootstrap'

import { Prices } from '../../shapes/index'
import { CalculatedFactorValue, CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

export default class KPIView extends React.Component {

  render() {
    const { purchasingPriceFactor, incidentalCosts, incidentalCostsPercent, netPricePerSquareMeter, rentPerSquareMeter, equity, loan } = this.props

    return (
      <Panel header="Schlüsselwerte">
        <Table fill>
          <tbody>
            <tr>
              <td width="25%">Kaufpreisfaktor ({"<"} 15-20)</td>
              <td width="25%"><strong><CalculatedFactorValue value={purchasingPriceFactor} invert={true}/></strong></td>

              <td width="25%">Eigenkapital</td>
              <td width="25%"><strong><CalculatedCurrencyValue value={equity} invert={true}/></strong></td>
            </tr>
            <tr>
              <td>Netto-Kaufpreis/m²</td>
              <td><strong><CalculatedCurrencyValue value={netPricePerSquareMeter} invert={true}/></strong></td>

              <td>Nebenkosten</td>
              <td><strong><CalculatedCurrencyValue value={incidentalCosts} invert={true}/></strong> (<CalculatedPercentValue value={incidentalCostsPercent} invert={true} precision={0}/>)</td>
            </tr>
            <tr>
              <td>Miete/m²</td>
              <td><strong><CalculatedCurrencyValue value={rentPerSquareMeter}/></strong></td>
              <td>Darlehen</td>
              <td><strong><CalculatedCurrencyValue value={loan} invert={true}/></strong></td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    purchasingPriceFactor: state.prices.purchasingPriceFactor,
    incidentalCosts: state.prices.incidentalCosts,
    incidentalCostsPercent: state.prices.incidentalCostsPercent,
    netPricePerSquareMeter: state.prices.netPricePerSquareMeter,
    rentPerSquareMeter: state.prices.rentPerSquareMeter,
    equity: state.prices.equity,
    loan: state.prices.loan,
  }
}

export default connect(
  mapStateToProps,
  {}
)(KPIView)
