import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

class FinancingForm extends React.Component {

  render() {
    const { equityPercent, equity, fixedBorrowingRateYears, borrowingRatePercent, amortizationRatePercent, followUpBorrowingRatePercent, specialYearlyPayment, specialYearlyPaymentPercent } = this.props
    return (
      <form>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "equityPercent")} defaultValue={equityPercent}/> % Eigenkapitalquote (<CalculatedCurrencyValue value={equity} invert={true}/>)</p>
        <p><input type="range" onChange={this.updatePercentValue.bind(this, "equityPercent")} defaultValue={equityPercent} /></p>
        <p><input type="text" onChange={this.updateIntegerValue.bind(this, "fixedBorrowingRateYears")} defaultValue={fixedBorrowingRateYears}/> Zinsbindung in Jahren (5, 10 oder 15 Jahre)</p>
        <p><input type="range" onChange={this.updateIntegerValue.bind(this, "fixedBorrowingRateYears")} defaultValue={fixedBorrowingRateYears} min={0} max={20} /></p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "borrowingRatePercent")} defaultValue={borrowingRatePercent}/> % Sollzins</p>
        <p><input type="range" onChange={this.updatePercentValue.bind(this, "borrowingRatePercent")} defaultValue={borrowingRatePercent} min={0} max={1} /></p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "followUpBorrowingRatePercent")} defaultValue={followUpBorrowingRatePercent}/> % Sollzins nach Ablauf der Zinsbindung</p>
        <p><input type="range" onChange={this.updatePercentValue.bind(this, "followUpBorrowingRatePercent")} defaultValue={followUpBorrowingRatePercent} min={0} max={1} /></p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "amortizationRatePercent")} defaultValue={amortizationRatePercent}/> % Anfängliche Tilgungsrate</p>
        <p><input type="range" onChange={this.updatePercentValue.bind(this, "amortizationRatePercent")} defaultValue={amortizationRatePercent} min={0} max={1}/></p>
        <p><input type="text" onChange={this.updateCurrencyValue.bind(this, "specialYearlyPayment")} defaultValue={specialYearlyPayment}/> € Sondertilgung im Jahr (<CalculatedPercentValue value={specialYearlyPaymentPercent}/>)</p>
        <p><input type="range" onChange={this.updateCurrencyValue.bind(this, "specialYearlyPayment")} defaultValue={specialYearlyPayment} min={0} max={5000}/></p>
      </form>
    );
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
  equityPercent: PropTypes.string,
  equity: PropTypes.number,
  fixedBorrowingRateYears: PropTypes.number,
  borrowingRatePercent: PropTypes.string,
  amortizationRatePercent: PropTypes.string,
  followUpBorrowingRatePercent: PropTypes.string,
  specialYearlyPayment: PropTypes.string,
  specialYearlyPaymentPercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    equityPercent: (state.baseData.equityPercent * 100).toFixed(1).replace(".",","),
    equity: state.prices.equity,
    fixedBorrowingRateYears: state.baseData.fixedBorrowingRateYears,
    borrowingRatePercent: (state.baseData.borrowingRatePercent * 100).toFixed(1).replace(".",","),
    amortizationRatePercent: (state.baseData.amortizationRatePercent * 100).toFixed(1).replace(".",","),
    followUpBorrowingRatePercent: (state.baseData.followUpBorrowingRatePercent * 100).toFixed(1).replace(".",","),
    specialYearlyPayment: (state.baseData.specialYearlyPayment).toFixed(0).replace(".",","),
    specialYearlyPaymentPercent: state.prices.specialYearlyPaymentPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(FinancingForm)
