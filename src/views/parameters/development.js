import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Input, Popover, OverlayTrigger, Button, Glyphicon } from 'react-bootstrap'

import { BaseData } from '../../shapes/index'
import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'
import { PercentUserInput, IntUserInput, FloatUserInput, RangeUserInput } from '../../components/userInput'

class MultiplyInput extends FloatUserInput {
  fromModelValue(value) {
    return super.fromModelValue((value || 0) * (this.props.multiplicant || 0))
  }
  toModelValue(value) {
    if (this.props.HOAFee == 0) {
      return 0
    }
    return super.toModelValue(value) / this.props.multiplicant
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

class DevelopmentForm extends React.Component {

  titleWithTooltip(title, tooltipText) {
    return (
      <OverlayTrigger placement="top" overlay={<Popover title="Erklärung" id="help">{tooltipText}</Popover>}>
        <p>{title} <Glyphicon glyph="question-sign"/></p>
      </OverlayTrigger>
    )
  }

  render() {
    const { apportionableHOAFeePercent, HOAFee, costFactorPercent, baseRent, yearlyRentIncrease } = this.props.baseData
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
        <Input label={this.titleWithTooltip("Umlagefähiges Hausgeld", "Der Anteil des Hausgelds der über die Nebenkostenabrechnung vom Mieter bezahlt wird. Der Rest wird zum Beispiel für die Instandhaltungs-rücklage oder die Verwaltung aufgewendet und ist vom Vermieter zu tragen.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <MultiplyInput
                changeBaseData={changeBaseData}
                value={apportionableHOAFeePercent}
                property="apportionableHOAFeePercent"
                disabled={disableFeature}
                multiplicant={HOAFee}
                addonAfter="€" />
            </Col>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={apportionableHOAFeePercent}
                property="apportionableHOAFeePercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={apportionableHOAFeePercent} property="apportionableHOAFeePercent" disabled={disableFeature} multiplier={100}/>
            </Col>
          </Row>
        </Input>

        <Input label={this.titleWithTooltip("Monatliche Kosten", "Angenommene monatliche Kosten für Instandhaltungsmaßnahmen am Sondereigentum sowie Schäden durch Mietausfall und Rücklagen. Standardmäßig werden 20% der Kaltmiete angenommen.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <MultiplyInput
                changeBaseData={changeBaseData}
                value={costFactorPercent}
                property="costFactorPercent"
                disabled={disableFeature}
                multiplicant={baseRent}
                addonAfter="€" />
            </Col>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={costFactorPercent}
                property="costFactorPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={costFactorPercent} property="costFactorPercent" disabled={disableFeature} multiplier={100}/>
            </Col>
          </Row>
        </Input>

        <Input label={this.titleWithTooltip("Jährliche Mietsteigerung", "Die zu erwartende Mietsteigerung pro Jahr. Beachten Sie bitte, dass es hierbei Beschränkungen gibt (20% in 3 Jahren, nicht höher als Ortsübliche Vergleichsmiete). In angespannten Wohnlagen liegt die Kappungsgrenze bei 15% in 3 Jahren.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={yearlyRentIncrease}
                property="yearlyRentIncrease"
                disabled={disableFeature}
                addonAfter="%" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={yearlyRentIncrease} property="yearlyRentIncrease" disabled={disableFeature} multiplier={100} max={6}/>
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

DevelopmentForm.propTypes = {
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
    baseData: state.baseData,

    disableFeature: !state.featureToggle.financingFeature,
    equity: state.prices.equity,
    loan: state.prices.loan,
    incidentalCosts: state.prices.incidentalCosts,
    specialYearlyPaymentPercent: state.prices.specialYearlyPaymentPercent,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(DevelopmentForm)
