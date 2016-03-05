import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { TableRow } from '../../shapes/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

class TableViewRow extends React.Component {
  render() {
    const { year, dept, borrowingRate, amortizationRate, totalRate, remainingDept } = this.props.row
    return (
      <tr>
        <td>{year}</td>
        <td><CalculatedCurrencyValue value={dept} invert={true}/></td>
        <td><CalculatedCurrencyValue value={borrowingRate} invert={true}/></td>
        <td><CalculatedCurrencyValue value={amortizationRate}/></td>
        <td><CalculatedCurrencyValue value={totalRate}/></td>
        <td><CalculatedCurrencyValue value={remainingDept} invert={true}/></td>
      </tr>
    )
  }
}

TableViewRow.propTypes = {
  row: TableRow.isRequired
}

class TableViewRowEndOfFixedBorrowingRate extends React.Component {
  render() {
    const { followUpBorrowingRatePercent } = this.props
    return (
      <tr>
        <td></td>
        <td colSpan={5}>Ende der Zinsbindung, neuer Zinsatz: <CalculatedPercentValue value={followUpBorrowingRatePercent}/></td>
      </tr>
    )
  }
}

TableViewRowEndOfFixedBorrowingRate.propTypes = {
  followUpBorrowingRatePercent: PropTypes.number.isRequired,
}

export default class TableView extends React.Component {

  render() {
    var rows = this.props.rows.map((row, i) => <TableViewRow row={row} key={i}/>)

    const { fixedBorrowingRateYears, followUpBorrowingRatePercent, borrowingRateTotalCost, amortizationRateTotalCost } = this.props
    if (fixedBorrowingRateYears > 0) {
      const row = <TableViewRowEndOfFixedBorrowingRate key="endOfFixedBorrowingRate" followUpBorrowingRatePercent={followUpBorrowingRatePercent} />
      rows.splice(fixedBorrowingRateYears, 0, row)
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Jahr</th>
            <th>Schuldenstand</th>
            <th>Zinsen</th>
            <th>Tilgung</th>
            <th>Gesamt</th>
            <th>Restschuld</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td></td>
            <td></td>
            <td><strong><CalculatedCurrencyValue value={borrowingRateTotalCost} invert={true}/></strong></td>
            <td><strong><CalculatedCurrencyValue value={amortizationRateTotalCost} invert={true}/></strong></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

TableView.propTypes = {
  rows: PropTypes.arrayOf(TableRow),
  fixedBorrowingRateYears: PropTypes.number.isRequired,
  followUpBorrowingRatePercent: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    rows: state.table,
    fixedBorrowingRateYears: state.baseData.fixedBorrowingRateYears,
    followUpBorrowingRatePercent: state.baseData.followUpBorrowingRatePercent,
    borrowingRateTotalCost: state.table.reduce((prev,elem,i,a) => prev + elem.borrowingRate, 0),
    amortizationRateTotalCost: state.table.reduce((prev,elem,i,a) => prev + elem.amortizationRate, 0),
  }
}

export default connect(
  mapStateToProps,
  {}
)(TableView)
