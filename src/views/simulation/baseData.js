import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { FloatUserInput } from '../../components/userInput'

class BaseDataForm extends React.Component {

  render() {
    const { changeBaseData, baseData } = this.props
    const { squareMeters, grossPrice, baseRent, HOAFee } = baseData
    return (
      <form>
        <p><FloatUserInput changeBaseData={changeBaseData} value={squareMeters} property="squareMeters" /> Quadratmeter</p>
        <p><FloatUserInput changeBaseData={changeBaseData} value={grossPrice} property="grossPrice"/> € Brutto Kaufpreis</p>
        <p><FloatUserInput changeBaseData={changeBaseData} value={baseRent} property="baseRent"/> € Kaltmiete/Monat</p>
        <p><FloatUserInput changeBaseData={changeBaseData} value={HOAFee} property="HOAFee"/> € Hausgeld/Monat</p>
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
