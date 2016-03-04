import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { CalculatedCurrencyValue } from '../../components/calculatedValue'

class IncidentalCostsForm extends React.Component {

  render() {
    const { commissionPercent, commission, realEstateTransferTaxPercent, realEstateTransferTax, notaryCostPercent, notaryCost, landRegisterCostPercent, landRegisterCost } = this.props
    return (
      <form>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "commissionPercent")} defaultValue={commissionPercent}/> % Courtage (<CalculatedCurrencyValue value={commission} invert={true}/>)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "realEstateTransferTaxPercent")} defaultValue={realEstateTransferTaxPercent}/> % Grunderwerbsteuer (<CalculatedCurrencyValue value={realEstateTransferTax} invert={true}/>)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "notaryCostPercent")} defaultValue={notaryCostPercent}/> % Notarkosten (<CalculatedCurrencyValue value={notaryCost} invert={true}/>)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "landRegisterCostPercent")} defaultValue={landRegisterCostPercent}/> % Grundbuch-Eintrag (<CalculatedCurrencyValue value={landRegisterCost} invert={true}/>)</p>
      </form>
    );
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

IncidentalCostsForm.propTypes = {
  commissionPercent: PropTypes.string.isRequired,
  commission: PropTypes.number.isRequired,
  realEstateTransferTaxPercent: PropTypes.string.isRequired,
  realEstateTransferTax: PropTypes.number.isRequired,
  notaryCostPercent: PropTypes.string.isRequired,
  notaryCost: PropTypes.number.isRequired,
  landRegisterCostPercent: PropTypes.string.isRequired,
  landRegisterCost: PropTypes.number.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { commissionPercent, realEstateTransferTaxPercent, notaryCostPercent, landRegisterCostPercent, grossPrice } = state.baseData
  return {
    commissionPercent: (commissionPercent * 100).toFixed(1).replace(".",","),
    commission: grossPrice * commissionPercent,
    realEstateTransferTaxPercent: (realEstateTransferTaxPercent * 100).toFixed(1).replace(".",","),
    realEstateTransferTax: grossPrice * realEstateTransferTaxPercent,
    notaryCostPercent: (notaryCostPercent * 100).toFixed(1).replace(".",","),
    notaryCost: grossPrice * notaryCostPercent,
    landRegisterCostPercent: (landRegisterCostPercent * 100).toFixed(1).replace(".",","),
    landRegisterCost: grossPrice * landRegisterCostPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(IncidentalCostsForm)
