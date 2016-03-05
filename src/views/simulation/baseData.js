import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBaseData } from '../../actions/index'
import { BaseData } from '../../shapes/index'
import { UserInput } from '../../components/userInput'

class BaseDataForm extends React.Component {

  render() {
    const { changeBaseData, baseData } = this.props
    const { squareMeters, grossPrice, baseRent, HOAFee } = baseData
    return (
      <form>
        <p><UserInput type="integer" onValueChange={(value) => changeBaseData("squareMeters", value)} value={squareMeters}/> Quadratmeter</p>
        <p><UserInput type="currency" onValueChange={(value) => changeBaseData("grossPrice", value)} value={grossPrice}/> € Brutto Kaufpreis</p>
        <p><UserInput type="currency" onValueChange={(value) => changeBaseData("baseRent", value)} value={baseRent}/> € Kaltmiete/Monat</p>
        <p><UserInput type="currency" onValueChange={(value) => changeBaseData("HOAFee", value)} value={HOAFee}/> € Hausgeld/Monat</p>
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
