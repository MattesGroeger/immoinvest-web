import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BaseData } from '../../shapes/index'

export default class GraphView extends React.Component {
  render() {
    const { baseData } = this.props
    return (<div> Brutto Preis: {baseData.grossPrice || 0}</div>)
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
