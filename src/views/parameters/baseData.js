import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { FloatUserInput } from '../../components/userInput'

class BaseDataForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.changeBaseData("grossPrice", this.props.baseData.grossPrice)
  }

  render() {
    const { changeBaseData, baseData } = this.props
    const { squareMeters, grossPrice, baseRent, HOAFee } = baseData
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
