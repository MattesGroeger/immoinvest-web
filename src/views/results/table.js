import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Table } from 'react-bootstrap'

import { TableRow, CashflowTableRow } from '../../shapes/index'
import { CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

class TableViewRow extends React.Component {
  render() {
    const { year, dept, borrowingRate, amortizationRate, totalRate } = this.props.row
    const { revenueYearly, costYearly } = this.props.developmentsRow
    const { profitYearly } = this.props.profitRow
    const { differenceYearly } = this.props.taxRow
    return (
      <tr>
        <td>{year}</td>
        <td><CalculatedCurrencyValue value={dept} invert={true}/></td>
        <td><CalculatedCurrencyValue value={-borrowingRate} invert={true}/></td>
        <td><CalculatedCurrencyValue value={-amortizationRate}/></td>
        <td><CalculatedCurrencyValue value={-totalRate}/></td>
        <td><CalculatedCurrencyValue value={revenueYearly} invert={true}/></td>
        <td><CalculatedCurrencyValue value={-costYearly} invert={true}/></td>
        <td><CalculatedCurrencyValue value={differenceYearly}/></td>
        <td><CalculatedCurrencyValue value={profitYearly}/></td>
      </tr>
    )
  }
}

TableViewRow.propTypes = {
  row: TableRow.isRequired,
  developmentsRow: CashflowTableRow.isRequired,
}

class TableViewRowEndOfFixedBorrowingRate extends React.Component {
  render() {
    const { followUpBorrowingRatePercent } = this.props
    return (
      <tr>
        <td></td>
        <td colSpan={8}>Ende der Zinsbindung, neuer Zinsatz: <CalculatedPercentValue value={followUpBorrowingRatePercent}/></td>
      </tr>
    )
  }
}

TableViewRowEndOfFixedBorrowingRate.propTypes = {
  followUpBorrowingRatePercent: PropTypes.number.isRequired,
}

export default class TableView extends React.Component {

  render() {
    const { financingTable, cashflowTable, taxTable, profitTable } = this.props
    var rows = financingTable.map((row, i) => <TableViewRow row={row} developmentsRow={cashflowTable[i]} taxRow={taxTable[i]} profitRow={profitTable[i]} key={i}/>)

    const { fixedBorrowingRateYears, followUpBorrowingRatePercent, borrowingRateTotalCost, amortizationRateTotalCost } = this.props
    if (fixedBorrowingRateYears > 0) {
      const row = <TableViewRowEndOfFixedBorrowingRate key="endOfFixedBorrowingRate" followUpBorrowingRatePercent={followUpBorrowingRatePercent} />
      rows.splice(fixedBorrowingRateYears, 0, row)
    }

    return (
      <Panel header="Tabellarische Darstellung">
        <Table fill>
          <thead>
            <tr>
              <th>Jahr</th>
              <th>Schuldenstand</th>
              <th>Zinsen</th>
              <th>Tilgung</th>
              <th>Gesamt</th>
              <th>Einnahmen</th>
              <th>Unterhalt</th>
              <th>Steuern</th>
              <th>Gewinn</th>
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
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    )
  }
}

TableView.propTypes = {
  financingTable: PropTypes.arrayOf(TableRow),
  fixedBorrowingRateYears: PropTypes.number.isRequired,
  followUpBorrowingRatePercent: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    financingTable: state.financingTable,
    cashflowTable: state.cashflowTable,
    taxTable: state.taxTable,
    profitTable: state.profitTable,
    fixedBorrowingRateYears: state.baseData.fixedBorrowingRateYears,
    followUpBorrowingRatePercent: state.baseData.followUpBorrowingRatePercent,
    borrowingRateTotalCost: state.financingTable.reduce((prev,elem,i,a) => prev + elem.borrowingRate, 0),
    amortizationRateTotalCost: state.financingTable.reduce((prev,elem,i,a) => prev + elem.amortizationRate, 0)
  }
}

export default connect(
  mapStateToProps,
  {}
)(TableView)
