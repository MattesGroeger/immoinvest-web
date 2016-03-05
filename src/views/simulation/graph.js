import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Prices } from '../../shapes/index'
import { CalculatedFactorValue, CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

export default class GraphView extends React.Component {

  render() {
    const { purchasingPriceFactor, incidentalCosts, incidentalCostsPercent, netPricePerSquareMeter, rentPerSquareMeter, equity, loan } = this.props
    return (
      <div>
        <ul>
          <li>Kaufpreisfaktor: <strong><CalculatedFactorValue value={purchasingPriceFactor} invert={true}/></strong> ({"<"} 15-20)</li>
          <li>Netto-Kaufpreis/m²: <strong><CalculatedCurrencyValue value={netPricePerSquareMeter} invert={true}/></strong></li>
          <li>Miete/m²: <strong><CalculatedCurrencyValue value={rentPerSquareMeter}/></strong></li>
          <hr/>
          <li>Eigenkapital: <strong><CalculatedCurrencyValue value={equity} invert={true}/></strong></li>
          <li>Nebenkosten: <strong><CalculatedCurrencyValue value={incidentalCosts} invert={true}/></strong> (<CalculatedPercentValue value={incidentalCostsPercent} invert={true} precision={0}/>)</li>
          <li>Darlehen: <strong><CalculatedCurrencyValue value={loan} invert={true}/></strong></li>
        </ul>
      </div>
    )
  }
}

GraphView.propTypes = Prices.isRequired

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
)(GraphView)
