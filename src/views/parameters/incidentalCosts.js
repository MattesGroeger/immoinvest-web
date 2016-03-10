import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Input } from 'react-bootstrap'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { CalculatedCurrencyValue } from '../../components/calculatedValue'
import { PercentUserInput, FloatUserInput, RangeUserInput } from '../../components/userInput'

class IncidentialCostUserInput extends FloatUserInput {
  fromModelValue(value) {
    return super.fromModelValue((value || 0) * (this.props.grossPrice || 0))
  }
  toModelValue(value) {
    if (this.props.grossPrice == 0) {
      return 0
    }
    return super.toModelValue(value) / this.props.grossPrice
  }
}

class IncidentalCostsForm extends React.Component {

  render() {
    const { changeBaseData, baseData } = this.props
    const { disableFeature, grossPrice, commissionPercent, commission, realEstateTransferTaxPercent, realEstateTransferTax, notaryCostPercent, notaryCost, landRegisterCostPercent, landRegisterCost } = this.props

    const warningFeatureDisabled = (
      <Alert bsStyle="warning">
        Bitte tragen Sie zunächst den Brutto-Kaufpreis ein!
      </Alert>
    )

    return (
      <form>
        {disableFeature ? warningFeatureDisabled : ""}
        <Input label="Courtage" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={commissionPercent}
                property="commissionPercent"
                disabled={disableFeature}
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <IncidentialCostUserInput
                changeBaseData={changeBaseData}
                value={commissionPercent}
                property="commissionPercent"
                disabled={disableFeature}
                grossPrice={grossPrice}
                addonAfter="€" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={commissionPercent} property="commissionPercent" disabled={disableFeature} multiplier={100} max={20}/>
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
                disabled={disableFeature}
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <IncidentialCostUserInput
                changeBaseData={changeBaseData}
                value={realEstateTransferTaxPercent}
                property="realEstateTransferTaxPercent"
                disabled={disableFeature}
                grossPrice={grossPrice}
                addonAfter="€" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={realEstateTransferTaxPercent} property="realEstateTransferTaxPercent" disabled={disableFeature} multiplier={100} max={6.5}/>
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
                disabled={disableFeature}
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <IncidentialCostUserInput
                changeBaseData={changeBaseData}
                value={notaryCostPercent}
                property="notaryCostPercent"
                disabled={disableFeature}
                grossPrice={grossPrice}
                addonAfter="€" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={notaryCostPercent} property="notaryCostPercent" disabled={disableFeature} multiplier={100} max={1.5}/>
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
                disabled={disableFeature}
                addonAfter="%"
              />
            </Col>
            <Col xs={6}>
              <IncidentialCostUserInput
                changeBaseData={changeBaseData}
                value={landRegisterCostPercent}
                property="landRegisterCostPercent"
                disabled={disableFeature}
                grossPrice={grossPrice}
                addonAfter="€" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={landRegisterCostPercent} property="landRegisterCostPercent" disabled={disableFeature} multiplier={100} max={0.5}/>
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
  disableFeature: PropTypes.bool.isRequired,
  commissionPercent: PropTypes.number.isRequired,
  realEstateTransferTaxPercent: PropTypes.number.isRequired,
  notaryCostPercent: PropTypes.number.isRequired,
  landRegisterCostPercent: PropTypes.number.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { commissionPercent, realEstateTransferTaxPercent, notaryCostPercent, landRegisterCostPercent, grossPrice } = state.baseData
  return {
    disableFeature: !state.featureToggle.incidentalCostsFeature,
    grossPrice: grossPrice,
    commissionPercent: commissionPercent,
    realEstateTransferTaxPercent: realEstateTransferTaxPercent,
    notaryCostPercent: notaryCostPercent,
    landRegisterCostPercent: landRegisterCostPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(IncidentalCostsForm)
