import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Input, Popover, OverlayTrigger, Glyphicon } from 'react-bootstrap'

import { BaseData } from '../../shapes/index'
import { changeBaseData } from '../../actions/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'
import { PercentUserInput, IntUserInput, FloatUserInput, RangeUserInput } from '../../components/userInput'

class TaxForm extends React.Component {
  titleWithTooltip(title, tooltipText) {
    return (
      <OverlayTrigger placement="top" overlay={<Popover title="Erklärung" id="help">{tooltipText}</Popover>}>
        <p>{title} <Glyphicon glyph="question-sign"/></p>
      </OverlayTrigger>
    )
  }

  render() {
    const { taxType, married, taxableYearlyIncome, incomeDevelopmentPercent } = this.props.baseData
    const { disableFeature, changeBaseData } = this.props

    const warningFeatureDisabled = (
      <Alert bsStyle="warning">
        Steuer-Aspekte können nur bei Mieteinnahmen berücksichtigt werden.
      </Alert>
    )

    return (
      <form>
        {disableFeature ? warningFeatureDisabled : ""}
        <Input type="select" defaultValue={taxType} onChange={(e) => changeBaseData("taxType", e.target.value)} label={this.titleWithTooltip("AfA", "Mit der Absetzung für Abnutzung (AfA) kann der Kaufpreis einer vermieteten Immobilie (ohne Bodenanteil) steuerlich geltend gemacht werden. Je nachdem um was für eine Immobilie es sich handelt gelten unterschiedliche Regeln.")} disabled={disableFeature}>
          <option value="new">Neubau</option>
          <option value="oldFrom1925">Altbau (Baujahr ab 1925)</option>
          <option value="oldBefore1925">Altbau (Baujahr vor 1925)</option>
          <option value="monument" disabled>Denkmal (noch nicht unterstützt)</option>
        </Input>
        <FloatUserInput
          changeBaseData={changeBaseData}
          value={taxableYearlyIncome}
          property="taxableYearlyIncome"
          label={this.titleWithTooltip("Bruttoeinkommen/Jahr", "Das jährlich zu versteuernde Einkommen ist wesentlich für die Steuerlast. Bitte achten Sie darauf nur das tatsächlich zu versteuernde Einkommen anzugeben ohne etwaige Freibeträge. Fragen Sie gegebenenfalls Ihren Steuerberater.")}
          addonAfter="€"
          disabled={disableFeature}
        />
        <Input
          type="checkbox"
          label="Verheiratet (noch nicht unterstützt)"
          defaultValue={married}
          onChange={(e) => changeBaseData("married", e.target.checked)}
          disabled={true}
        />
        <Input label={this.titleWithTooltip("Gehaltsentwicklung/Jahr", "Die Gehaltsentwicklung beeinflusst Ihre zukünftige Steuerlast. Eine Steigerung auf dem Niveau der Inflationsrate wird in der Regel zu einem Netto-Verlust führen, da mit mehr Einkommen auch die Steuerlast steigt.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={incomeDevelopmentPercent}
                property="incomeDevelopmentPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={incomeDevelopmentPercent} property="incomeDevelopmentPercent" disabled={disableFeature} multiplier={100} min={-20} max={20}/>
            </Col>
          </Row>
        </Input>
      </form>
    )
  }
}

TaxForm.propTypes = {
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
    disableFeature: !state.featureToggle.taxFeature,
    baseData: state.baseData,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(TaxForm)
