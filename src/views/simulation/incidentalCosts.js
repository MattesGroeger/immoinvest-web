import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input } from 'react-bootstrap'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { CalculatedCurrencyValue } from '../../components/calculatedValue'
import { PercentUserInput } from '../../components/userInput'

class IncidentalCostsForm extends React.Component {

  render() {
    const { changeBaseData, baseData } = this.props
    const { commissionPercent, commission, realEstateTransferTaxPercent, realEstateTransferTax, notaryCostPercent, notaryCost, landRegisterCostPercent, landRegisterCost } = this.props
    return (
      <form>
        <Input label="Courtage" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={commissionPercent}
                property="commissionPercent"
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <CalculatedCurrencyValue value={commission} invert={true}/>
            </Col>
          </Row>
        </Input>
        <Input label="Grunderwerbsteuer" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={realEstateTransferTaxPercent}
                property="realEstateTransferTaxPercent"
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <CalculatedCurrencyValue value={realEstateTransferTax} invert={true}/>
            </Col>
          </Row>
        </Input>
        <Input label="Notarkosten" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={notaryCostPercent}
                property="notaryCostPercent"
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <CalculatedCurrencyValue value={notaryCost} invert={true}/>
            </Col>
          </Row>
        </Input>
        <Input label="Grundbuch-Eintrag" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={landRegisterCostPercent}
                property="landRegisterCostPercent"
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <CalculatedCurrencyValue value={landRegisterCost} invert={true}/>
            </Col>
          </Row>
        </Input>
      </form>
    );
  }

  updatePercentValue(property, event) {
    this.props.changeBaseData(property, parseFloat(event.target.value.replace(",","."))/100)
  }
}

IncidentalCostsForm.propTypes = {
  commissionPercent: PropTypes.number.isRequired,
  commission: PropTypes.number.isRequired,
  realEstateTransferTaxPercent: PropTypes.number.isRequired,
  realEstateTransferTax: PropTypes.number.isRequired,
  notaryCostPercent: PropTypes.number.isRequired,
  notaryCost: PropTypes.number.isRequired,
  landRegisterCostPercent: PropTypes.number.isRequired,
  landRegisterCost: PropTypes.number.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { commissionPercent, realEstateTransferTaxPercent, notaryCostPercent, landRegisterCostPercent, grossPrice } = state.baseData
  return {
    commissionPercent: commissionPercent,
    commission: grossPrice * commissionPercent,
    realEstateTransferTaxPercent: realEstateTransferTaxPercent,
    realEstateTransferTax: grossPrice * realEstateTransferTaxPercent,
    notaryCostPercent: notaryCostPercent,
    notaryCost: grossPrice * notaryCostPercent,
    landRegisterCostPercent: landRegisterCostPercent,
    landRegisterCost: grossPrice * landRegisterCostPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(IncidentalCostsForm)
