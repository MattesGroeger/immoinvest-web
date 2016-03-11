import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Input } from 'react-bootstrap'

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
    const { disableFeature, changeBaseData, equity, loan, incidentalCosts, specialYearlyPaymentPercent } = this.props

    const warningFeatureDisabled = (
      <Alert bsStyle="warning">
        Bitte tragen Sie zunächst den Brutto-Kaufpreis ein!
      </Alert>
    )

    return (
      <form>
        {disableFeature ? warningFeatureDisabled : ""}
        <Input label="Eigenkapital" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <EquityUserInput
                changeBaseData={changeBaseData}
                value={equityPercent}
                property="equityPercent"
                disabled={disableFeature}
                grossPrice={grossPrice}
                incidentalCosts={incidentalCosts}
                addonAfter="€" />
            </Col>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={equityPercent}
                property="equityPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={equityPercent} property="equityPercent" disabled={disableFeature} multiplier={100}/>
            </Col>
          </Row>
        </Input>

        <Input label="Sollzins" wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={borrowingRatePercent}
                property="borrowingRatePercent"
                disabled={disableFeature}
                addonAfter="%" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={borrowingRatePercent} property="borrowingRatePercent" disabled={disableFeature} multiplier={100} max={15}/>
            </Col>
          </Row>
        </Input>

        <Input label="Anfängliche Tilgungsrate" wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={amortizationRatePercent}
                property="amortizationRatePercent"
                disabled={disableFeature}
                addonAfter="%" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={amortizationRatePercent} property="amortizationRatePercent" disabled={disableFeature} multiplier={100} max={10}/>
            </Col>
          </Row>
        </Input>

        <Input label="Jährliche Sondertilgung" wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <FloatUserInput
                changeBaseData={changeBaseData}
                value={specialYearlyPayment}
                property="specialYearlyPayment"
                disabled={disableFeature}
                addonAfter="€" />
            </Col>
            <Col xs={6}>
              <SpecialYearlyPaymentInput
                changeBaseData={changeBaseData}
                value={specialYearlyPayment}
                property="specialYearlyPayment"
                disabled={disableFeature}
                loan={loan}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={specialYearlyPayment} property="specialYearlyPayment" disabled={disableFeature} max={0.1 * loan}/>
            </Col>
          </Row>
        </Input>

        <Input label="Zinsbindung" wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <IntUserInput
                changeBaseData={changeBaseData}
                value={fixedBorrowingRateYears}
                property="fixedBorrowingRateYears"
                disabled={disableFeature}
                addonAfter="Jahre" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={fixedBorrowingRateYears} property="fixedBorrowingRateYears" disabled={disableFeature} max={20}/>
            </Col>
          </Row>
        </Input>

        <Input label="Sollzins nach Ablauf Zinsbindung" wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={followUpBorrowingRatePercent}
                property="followUpBorrowingRatePercent"
                disabled={disableFeature}
                addonAfter="%" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={followUpBorrowingRatePercent} property="followUpBorrowingRatePercent" disabled={disableFeature} multiplier={100} max={15}/>
            </Col>
          </Row>
        </Input>
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
  disableFeature: PropTypes.bool.isRequired,
  baseData: BaseData.isRequired,
  changeBaseData: PropTypes.func.isRequired,
  equity: PropTypes.number,
  loan: PropTypes.number,
  incidentalCosts: PropTypes.number,
  specialYearlyPaymentPercent: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    disableFeature: !state.featureToggle.financingFeature,
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
