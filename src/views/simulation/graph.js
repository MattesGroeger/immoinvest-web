import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BaseData } from '../../shapes/index'

export default class GraphView extends React.Component {
  render() {
    const { baseData } = this.props
    return (
      <div>
        <ul>
          <li>Kaufpreisfaktor: <strong>{(baseData.purchasingPriceFactor || 0).toFixed(2)}</strong> ({"<"} 15-20)</li>
          <li>Nebenkosten: <strong>{(baseData.incidentalCosts || 0).toFixed(2)}</strong> € ({((baseData.incidentalCosts/baseData.grossPrice || 0)*100).toFixed(0)} %)</li>
          <li>Netto-Kaufpreis/m²: <strong>{(baseData.netPricePerSquareMeter || 0).toFixed(2)}</strong> €</li>
          <li>Miete/m²: <strong>{(baseData.rentPerSquareMeter || 0).toFixed(2)}</strong> €</li>
        </ul>
      </div>
    )
  }
}

GraphView.propTypes = {
  baseData: BaseData.isRequired
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
