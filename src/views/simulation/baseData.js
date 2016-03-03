import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'

class BaseDataForm extends React.Component {

  render() {
    return (
      <form>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "squareMeters")}/> Quadratmeter</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "grossPrice")}/> Brutto Kaufpreis</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "baseRent")}/> Kaltmiete/Monat</p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "HOAFee")}/> Hausgeld/Monat</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "commission")} defaultValue="0"/> Courtage in %</p>
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
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(BaseDataForm)
