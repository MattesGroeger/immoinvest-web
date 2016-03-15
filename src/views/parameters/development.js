import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, Row, Col, Input, Popover, OverlayTrigger, Button, Glyphicon } from 'react-bootstrap'

import { BaseData } from '../../shapes/index'
import { changeBaseData } from '../../actions/index'
import { PercentUserInput, MultiplyInput, RangeUserInput } from '../../components/userInput'

class DevelopmentForm extends React.Component {

  titleWithTooltip(title, tooltipText) {
    return (
      <OverlayTrigger placement="top" overlay={<Popover title="Erklärung" id="help">{tooltipText}</Popover>}>
        <p>{title} <Glyphicon glyph="question-sign"/></p>
      </OverlayTrigger>
    )
  }

  render() {
    const { grossPrice, landPortionPercent, landDevelopmentPercent, flatDevelopmentPercent } = this.props.baseData
    const { disableFeature, changeBaseData } = this.props

    const warningFeatureDisabled = (
      <Alert bsStyle="warning">
        Bitte tragen Sie zunächst den Brutto-Kaufpreis ein!
      </Alert>
    )

    return (
      <form>
        {disableFeature ? warningFeatureDisabled : ""}
        <Input label={this.titleWithTooltip("Anteil Boden", "Bei jedem Erwerb wird in der Regel auch ein Bodenanteil mit gekauft. Dieser Anteil ist wichtig für die Besteuerung sowie die Wertentwicklung.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={6}>
              <MultiplyInput
                changeBaseData={changeBaseData}
                value={landPortionPercent}
                property="landPortionPercent"
                disabled={disableFeature}
                multiplicant={grossPrice}
                addonAfter="€" />
            </Col>
            <Col xs={6}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={landPortionPercent}
                property="landPortionPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={landPortionPercent} property="landPortionPercent" disabled={disableFeature} multiplier={100}/>
            </Col>
          </Row>
        </Input>

        <Input label={this.titleWithTooltip("Boden/Jahr", "Hier wird die zukünftige Wertentwicklung des Bodens angenommen. Je nach Lage kann sich der Boden unabhängig von der Wohnung entwickeln. In Ballungsräumen kann der Bodenwert viel stärker steigen als in strukturschwachen Regionen.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={landDevelopmentPercent}
                property="landDevelopmentPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={landDevelopmentPercent} property="landDevelopmentPercent" disabled={disableFeature} multiplier={100} min={-5} max={5}/>
            </Col>
          </Row>
        </Input>

        <Input label={this.titleWithTooltip("Wohnung/Jahr", "Der Wert der Wohnung nimmt in der Regel ab da durch die zunehmende Alterung erhöhter Sanierungsbedarf entsteht. Oftmals werden Instandhaltungsmaßnahmen hinausgezögert was sich negativ auf die Wertentwicklung auswirken kann.")} wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <PercentUserInput
                changeBaseData={changeBaseData}
                value={flatDevelopmentPercent}
                property="flatDevelopmentPercent"
                disabled={disableFeature}
                size={6}
                addonAfter="%"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={flatDevelopmentPercent} property="flatDevelopmentPercent" disabled={disableFeature} multiplier={100} min={-5} max={5}/>
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
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData,
    disableFeature: !state.featureToggle.developmentFeature,
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(DevelopmentForm)
