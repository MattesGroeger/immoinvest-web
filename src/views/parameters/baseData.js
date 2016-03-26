import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input, Row, Col } from 'react-bootstrap'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { FloatUserInput, RangeUserInput, IntUserInput } from '../../components/userInput'

class BaseDataForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.changeBaseData("grossPrice", this.props.baseData.grossPrice)
  }

  render() {
    const { changeBaseData, baseData } = this.props
    const { squareMeters, grossPrice, baseRent, HOAFee, investmentPeriod } = baseData
    return (
      <form>
        <FloatUserInput
          changeBaseData={changeBaseData}
          value={grossPrice}
          property="grossPrice"
          label="Kaufpreis"
          addonAfter="€"
        />
        <FloatUserInput
          changeBaseData={changeBaseData}
          value={baseRent}
          property="baseRent"
          label="Kaltmiete/Monat"
          addonAfter="€"
        />
        <FloatUserInput
          changeBaseData={changeBaseData}
          value={HOAFee}
          property="HOAFee"
          label="Hausgeld/Monat"
          addonAfter="€"
        />
        <FloatUserInput
          changeBaseData={changeBaseData}
          value={squareMeters}
          property="squareMeters"
          label="Quadratmeter"
          addonAfter="m²"
        />
        <Input label="Investitions-Zeitraum" wrapperClassName="wrapper">
          <Row>
            <Col xs={12}>
              <IntUserInput
                changeBaseData={changeBaseData}
                value={investmentPeriod}
                property="investmentPeriod"
                addonAfter="Jahre" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RangeUserInput changeBaseData={changeBaseData} value={investmentPeriod} property="investmentPeriod" min={10} max={60} round={true}/>
            </Col>
          </Row>
        </Input>
      </form>
    );
  }
}

BaseDataForm.propTypes = {
  baseData: BaseData.isRequired,
  changeBaseData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData
  }
}

export default connect(
  mapStateToProps,
  { changeBaseData }
)(BaseDataForm)
