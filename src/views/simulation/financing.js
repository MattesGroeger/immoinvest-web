import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { BaseData } from '../../shapes/index'
import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'
import { PercentUserInput, IntUserInput, FloatUserInput, RangeUserInput } from '../../components/userInput'

class FinancingForm extends React.Component {

  render() {
    const { equityPercent, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, amortizationRatePercent, specialYearlyPayment } = this.props.baseData
    const { changeBaseData, equity, loan, specialYearlyPaymentPercent } = this.props
    return (
      <form>
        <p><PercentUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent"/> % Eigenkapitalquote (<CalculatedCurrencyValue value={equity} invert={true}/>)</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent" multiplier={100}/></p>
        <p><IntUserInput changeBaseData={changeBaseData} value={fixedBorrowingRateYears} property="fixedBorrowingRateYears"/> Zinsbindung in Jahren (5, 10 oder 15 Jahre)</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={fixedBorrowingRateYears} property="fixedBorrowingRateYears" max={20}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={borrowingRatePercent} property="borrowingRatePercent"/> % Sollzins</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={borrowingRatePercent} property="borrowingRatePercent" multiplier={100} max={15}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={followUpBorrowingRatePercent} property="followUpBorrowingRatePercent"/> % Sollzins nach Ablauf der Zinsbindung</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={followUpBorrowingRatePercent} property="followUpBorrowingRatePercent" multiplier={100} max={15}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={amortizationRatePercent} property="amortizationRatePercent"/> % Anfängliche Tilgungsrate</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={amortizationRatePercent} property="amortizationRatePercent" multiplier={100} max={10}/></p>
        <p><FloatUserInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment"/> € Sondertilgung im Jahr (<CalculatedPercentValue value={specialYearlyPaymentPercent}/>)</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment" max={0.1 * loan}/></p>
      </form>
    )
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
  baseData: BaseData.isRequired,
  changeBaseData: PropTypes.func.isRequired,
  equity: PropTypes.number,
  loan: PropTypes.number,
  specialYearlyPaymentPercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData,
    equity: state.prices.equity,
    loan: state.prices.loan,
    specialYearlyPaymentPercent: state.prices.specialYearlyPaymentPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(FinancingForm)
