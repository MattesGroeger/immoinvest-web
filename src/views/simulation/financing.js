import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { BaseData } from '../../shapes/index'
import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'
import { PercentUserInput, IntUserInput, FloatUserInput, RangeUserInput } from '../../components/userInput'

class EquityUserInput extends FloatUserInput {
  fromModelValue(value) {
    return super.fromModelValue((value || 0) * (this.props.grossPrice || 0) + this.props.incidentalCosts)
  }
  toModelValue(value) {
    if (this.props.grossPrice == 0) {
      return 0
    }
    return (super.toModelValue(value) - this.props.incidentalCosts) / this.props.grossPrice
  }
}

class SpecialYearlyPaymentInput extends PercentUserInput {
  fromModelValue(value) {
    if ((this.props.loan||0) == 0) {
      return super.fromModelValue(0)
    }
    return super.fromModelValue((value || 0) / this.props.loan)
  }
  toModelValue(value) {
    return super.toModelValue(value) * this.props.loan
  }
}

SpecialYearlyPaymentInput.propTypes = { loan: PropTypes.number.isRequired }
SpecialYearlyPaymentInput.defaultProps = { loan: 0, digits: 2 }

class FinancingForm extends React.Component {

  render() {
    const { grossPrice, equityPercent, fixedBorrowingRateYears, borrowingRatePercent, followUpBorrowingRatePercent, amortizationRatePercent, specialYearlyPayment } = this.props.baseData
    const { changeBaseData, equity, loan, incidentalCosts, specialYearlyPaymentPercent } = this.props
    return (
      <form>
        <p>
          <EquityUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent" grossPrice={grossPrice} incidentalCosts={incidentalCosts}/> €
          <PercentUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent" size={6}/> % Eigenkapitalquote
        </p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent" multiplier={100}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={borrowingRatePercent} property="borrowingRatePercent"/> % Sollzins</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={borrowingRatePercent} property="borrowingRatePercent" multiplier={100} max={15}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={amortizationRatePercent} property="amortizationRatePercent"/> % Anfängliche Tilgungsrate</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={amortizationRatePercent} property="amortizationRatePercent" multiplier={100} max={10}/></p>
        <p>
          <FloatUserInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment"/> €
          <SpecialYearlyPaymentInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment" loan={loan} size={6}/> % Sondertilgung im Jahr
        </p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment" max={0.1 * loan}/></p>
        <p><IntUserInput changeBaseData={changeBaseData} value={fixedBorrowingRateYears} property="fixedBorrowingRateYears"/> Zinsbindung in Jahren (5, 10 oder 15 Jahre)</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={fixedBorrowingRateYears} property="fixedBorrowingRateYears" max={20}/></p>
        <p><PercentUserInput changeBaseData={changeBaseData} value={followUpBorrowingRatePercent} property="followUpBorrowingRatePercent"/> % Sollzins nach Ablauf der Zinsbindung</p>
        <p><RangeUserInput changeBaseData={changeBaseData} value={followUpBorrowingRatePercent} property="followUpBorrowingRatePercent" multiplier={100} max={15}/></p>
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
  incidentalCosts: PropTypes.number,
  specialYearlyPaymentPercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData,
    equity: state.prices.equity,
    loan: state.prices.loan,
    incidentalCosts: state.prices.incidentalCosts,
    specialYearlyPaymentPercent: state.prices.specialYearlyPaymentPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(FinancingForm)
