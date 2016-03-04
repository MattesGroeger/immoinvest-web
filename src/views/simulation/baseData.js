import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'

class BaseDataForm extends React.Component {

  render() {
    const { commission } = this.props
    return (
      <form>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "squareMeters")}/> Quadratmeter</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "grossPrice")}/> Brutto Kaufpreis</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "baseRent")}/> Kaltmiete/Monat</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "HOAFee")}/> Hausgeld/Monat</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "commission")} defaultValue="0"/> % Courtage ({commission} €)</p>
      </form>
    );
  }

  updateCurrencyValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",",".")))
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

BaseDataForm.propTypes = {
  commission: PropTypes.string.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { commission, grossPrice } = state.baseData
  return {
    commission: (grossPrice * commission).toFixed(2),
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(BaseDataForm)
