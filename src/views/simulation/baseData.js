import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BaseData } from '../../shapes/index'

import { changeBaseData } from '../../actions/index'

class BaseDataForm extends React.Component {

  render() {
    const { baseData, changeBaseData } = this.props
    return (
      <form>
        <p><input type="text" onChange={(event) => changeBaseData("squareMeters", parseFloat(event.target.value.replace(",",".")))}/> Quadratmeter</p>
        <p><input type="text" onChange={(event) => changeBaseData("grossPrice", parseFloat(event.target.value.replace(",",".")))}/> Brutto Kaufpreis</p>
        <p><input type="text" onChange={(event) => changeBaseData("baseRent", parseFloat(event.target.value.replace(",",".")))}/> Kaltmiete/Monat</p>
        <p><input type="text" onChange={(event) => changeBaseData("HOAFee", parseFloat(event.target.value.replace(",",".")))}/> Hausgeld/Monat</p>
        <p><input type="text" onChange={(event) => changeBaseData("commission", parseFloat(event.target.value.replace(",","."))/100)} defaultValue="0"/> Courtage in %</p>
      </form>
    )
  }

  // handleGrossPriceChange(event) {
  //   this.props.dispatch(changeBaseDataGrossPrice(event.target.value))
  // }
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
  { changeBaseData: changeBaseData }
)(BaseDataForm)
