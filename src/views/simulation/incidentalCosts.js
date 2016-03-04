import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'

class IncidentalCostsForm extends React.Component {

  render() {
    const { realEstateTransferTaxPercent, realEstateTransferTax, notaryCostPercent, notaryCost, landRegisterCostPercent, landRegisterCost } = this.props
    return (
      <form>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "realEstateTransferTaxPercent")} defaultValue={realEstateTransferTaxPercent}/> % Grunderwerbsteuer ({realEstateTransferTax} €)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "notaryCostPercent")} defaultValue={notaryCostPercent}/> % Notarkosten ({notaryCost} €)</p>
        <p><input type="text" onChange={this.updatePercentValue.bind(this, "landRegisterCostPercent")} defaultValue={landRegisterCostPercent}/> % Grundbuch-Eintrag ({landRegisterCost} €)</p>
      </form>
    );
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

IncidentalCostsForm.propTypes = {
  realEstateTransferTaxPercent: PropTypes.string.isRequired,
  notaryCostPercent: PropTypes.string.isRequired,
  landRegisterCostPercent: PropTypes.string.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { realEstateTransferTaxPercent, notaryCostPercent, landRegisterCostPercent, grossPrice } = state.baseData
  return {
    realEstateTransferTaxPercent: (realEstateTransferTaxPercent * 100).toFixed(1).replace(".",","),
    realEstateTransferTax: (grossPrice * realEstateTransferTaxPercent).toFixed(2),
    notaryCostPercent: (notaryCostPercent * 100).toFixed(1).replace(".",","),
    notaryCost: (grossPrice * notaryCostPercent).toFixed(2),
    landRegisterCostPercent: (landRegisterCostPercent * 100).toFixed(1).replace(".",","),
    landRegisterCost: (grossPrice * landRegisterCostPercent).toFixed(2),
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(IncidentalCostsForm)
