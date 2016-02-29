import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BaseData } from '../../shapes/index'

import { changeBaseDataGrossPrice } from '../../actions/index'

class BaseDataForm extends React.Component {

  render() {
    const { baseData, changeBaseDataGrossPrice } = this.props
    // <p><input type="text" value={baseData.grossPrice}/> Brutto Kaufpreis</p>
    return (
      <form>
        <p><input type="text"/> Postleitzahl</p>
        <p><input type="text"/> Quadratmeter</p>
        <p><input type="text" onChange={(event) => changeBaseDataGrossPrice(parseInt(event.target.value))}/> Brutto Kaufpreis</p>
        <p><input type="text"/> Kaltmiete/Monat</p>
        <p><input type="text"/> Hausgeld/Monat</p>
        <p><input type="text"/> Courtage in %</p>
      </form>
    )
  }

  // handleGrossPriceChange(event) {
  //   this.props.dispatch(changeBaseDataGrossPrice(event.target.value))
  // }
}

BaseDataForm.propTypes = {
  baseData: BaseData.isRequired,
  changeBaseDataGrossPrice: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    baseData: state.baseData
  }
}

export default connect(
  mapStateToProps,
  { changeBaseDataGrossPrice: changeBaseDataGrossPrice }
)(BaseDataForm)
