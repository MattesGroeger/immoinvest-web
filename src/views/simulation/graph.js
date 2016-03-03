import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Prices } from '../../shapes/index'

export default class GraphView extends React.Component {
  render() {
    const { purchasingPriceFactor, incidentalCosts, incidentalCostsPercent, netPricePerSquareMeter, rentPerSquareMeter } = this.props
    return (
      <div>
        <ul>
          <li>Kaufpreisfaktor: <strong>{purchasingPriceFactor}</strong> ({"<"} 15-20)</li>
          <li>Nebenkosten: <strong>{incidentalCosts}</strong> € ({incidentalCostsPercent} %)</li>
          <li>Netto-Kaufpreis/m²: <strong>{netPricePerSquareMeter}</strong> €</li>
          <li>Miete/m²: <strong>{rentPerSquareMeter}</strong> €</li>
        </ul>
      </div>
    )
  }
}

GraphView.propTypes = Prices.isRequired

function mapStateToProps(state) {
  const {
    purchasingPriceFactor,
    incidentalCosts,
    grossPrice,
    netPricePerSquareMeter,
    rentPerSquareMeter } = state.prices
  return {
    purchasingPriceFactor: (purchasingPriceFactor || 0).toFixed(2),
    incidentalCosts: (incidentalCosts || 0).toFixed(2),
    incidentalCostsPercent: ((incidentalCosts/grossPrice || 0)*100).toFixed(0),
    netPricePerSquareMeter: (netPricePerSquareMeter || 0).toFixed(2),
    rentPerSquareMeter: (rentPerSquareMeter || 0).toFixed(2)
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
