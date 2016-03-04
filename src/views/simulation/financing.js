import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue } from '../../components/calculatedValue'

class FinancingForm extends React.Component {

  render() {
    const { equityPercent, equity, fixedBorrowingRateYears, borrowingRatePercent, amortizationRatePercent, followUpBorrowingRatePercent } = this.props
    return (
      <form>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "equityPercent")} defaultValue={equityPercent}/> % Eigenkapitalquote (<CalculatedCurrencyValue value={equity} invert={true}/>)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "fixedBorrowingRateYears")} defaultValue={fixedBorrowingRateYears}/> Zinsbindung in Jahren (5, 10 oder 15 Jahre)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "borrowingRatePercent")} defaultValue={borrowingRatePercent}/> % Sollzins</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "followUpBorrowingRatePercent")} defaultValue={followUpBorrowingRatePercent}/> % Sollzins nach Ablauf der Zinsbindung</p>
      </form>
    );
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

FinancingForm.propTypes = {
  changeBaseData: PropTypes.func.isRequired,
  equityPercent: PropTypes.number,
  equity: PropTypes.number,
  fixedBorrowingRateYears: PropTypes.number,
  borrowingRatePercent: PropTypes.number,
  amortizationRatePercent: PropTypes.number,
  followUpBorrowingRatePercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    equityPercent: state.baseData.equityPercent * 100,
    equity: state.prices.equity,
    fixedBorrowingRateYears: state.baseData.fixedBorrowingRateYears,
    borrowingRatePercent: state.baseData.borrowingRatePercent * 100,
    amortizationRatePercent: state.baseData.amortizationRatePercent * 100,
    followUpBorrowingRatePercent: state.baseData.followUpBorrowingRatePercent * 100,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(FinancingForm)
