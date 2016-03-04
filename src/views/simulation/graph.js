import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Prices } from '../../shapes/index'
import { CalculatedFactorValue, CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

export default class GraphView extends React.Component {

  render() {
    const { purchasingPriceFactor, incidentalCosts, incidentalCostsPercent, netPricePerSquareMeter, rentPerSquareMeter } = this.props
    return (
      <div>
        <ul>
          <li>Kaufpreisfaktor: <strong><CalculatedFactorValue value={purchasingPriceFactor} invert={true}/></strong> ({"<"} 15-20)</li>
          <li>Nebenkosten: <strong><CalculatedCurrencyValue value={incidentalCosts} invert={true}/></strong> (<CalculatedPercentValue value={incidentalCostsPercent} invert={true} precision={0}/>)</li>
          <li>Netto-Kaufpreis/m²: <strong><CalculatedCurrencyValue value={netPricePerSquareMeter} invert={true}/></strong></li>
          <li>Miete/m²: <strong><CalculatedCurrencyValue value={rentPerSquareMeter}/></strong></li>
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
    incidentalCostsPercent: state.prices.incidentalCostsPercent || 0,
    netPricePerSquareMeter: state.prices.netPricePerSquareMeter,
    rentPerSquareMeter: state.prices.rentPerSquareMeter
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
