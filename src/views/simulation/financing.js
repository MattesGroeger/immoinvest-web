import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData, changeBaseDataObject } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

class FinancingForm extends React.Component {

  render() {
    const { equityPercent, equity, fixedBorrowingRateYears, borrowingRatePercent, amortizationRatePercent, followUpBorrowingRatePercent, specialYearlyPayment, specialYearlyPaymentPercent } = this.props
    return (
      <form>
        <p><input type="text" valueLink={this.linkWithState("equityPercent", "text")}/> % Eigenkapitalquote (<CalculatedCurrencyValue value={equity} invert={true}/>)</p>
        <p><input type="range" valueLink={this.linkWithState("equityPercent", "range")} /></p>
        <p><input type="text" valueLink={this.linkWithState("fixedBorrowingRateYears", "text")}/> Zinsbindung in Jahren (5, 10 oder 15 Jahre)</p>
        <p><input type="range" valueLink={this.linkWithState("fixedBorrowingRateYears", "range")} min={0} max={20} /></p>
        <p><input type="text" valueLink={this.linkWithState("borrowingRatePercent", "text")}/> % Sollzins</p>
        <p><input type="range" valueLink={this.linkWithState("borrowingRatePercent", "range")}/></p>
        <p><input type="text" valueLink={this.linkWithState("followUpBorrowingRatePercent", "text")}/> % Sollzins nach Ablauf der Zinsbindung</p>
        <p><input type="range" valueLink={this.linkWithState("followUpBorrowingRatePercent", "range")}/></p>
        <p><input type="text" valueLink={this.linkWithState("amortizationRatePercent", "text")}/> % Anfängliche Tilgungsrate</p>
        <p><input type="range" valueLink={this.linkWithState("amortizationRatePercent", "range")}/></p>
        <p><input type="text" valueLink={this.linkWithState("specialYearlyPayment", "text")}/> € Sondertilgung im Jahr (<CalculatedPercentValue value={specialYearlyPaymentPercent}/>)</p>
        <p><input type="range" valueLink={this.linkWithState("specialYearlyPayment", "range")}/></p>
      </form>
    );
  }

  linkWithState(key, subkey) {
    return {
      value: this.props[key][subkey],
      requestChange: function(value) {
        this.props.changeBaseDataObject(key, subkey, value)
      }.bind(this)
    }
  }

  updateIntegerValue(property, event) {
    this.props.changeBaseData(property, parseInt(event.target.value))
  }

  updateCurrencyValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",",".")))
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

FinancingForm.propTypes = {
  changeBaseData: PropTypes.func.isRequired,
  changeBaseDataObject: PropTypes.func.isRequired,
  equity: PropTypes.number,
  equityPercent: PropTypes.object.isRequired,
  fixedBorrowingRateYears: PropTypes.object.isRequired,
  borrowingRatePercent: PropTypes.object.isRequired,
  amortizationRatePercent: PropTypes.object.isRequired,
  followUpBorrowingRatePercent: PropTypes.object.isRequired,
  specialYearlyPayment: PropTypes.object.isRequired,
  specialYearlyPaymentPercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    equityPercent: state.baseData.equityPercent,
    equity: state.prices.equity,
    fixedBorrowingRateYears: state.baseData.fixedBorrowingRateYears,
    borrowingRatePercent: state.baseData.borrowingRatePercent,
    amortizationRatePercent: state.baseData.amortizationRatePercent,
    followUpBorrowingRatePercent: state.baseData.followUpBorrowingRatePercent,
    specialYearlyPayment: state.baseData.specialYearlyPayment,
    specialYearlyPaymentPercent: state.prices.specialYearlyPaymentPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData, changeBaseDataObject }
)(FinancingForm)
