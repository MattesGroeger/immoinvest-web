import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Tabs, Tab } from 'react-bootstrap'

import { CalculatedFactorValue, CalculatedCurrencyValue, CalculatedPercentValue } from '../../components/calculatedValue'

class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {chart: undefined}
  }

  componentDidMount() {
    const { chartData, chartOptions } = this.props
    const ctx = this.refs.canvas.getContext('2d')
    this.state.chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    })
  }

  componentWillReceiveProps(nextProps) {
    const { chart } = this.state
    chart.chart.config.data = nextProps.chartData
    chart.update(0)
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas ref="canvas" width={width} height={height}></canvas>
    )
  }
}

export default class GraphView extends React.Component {

  render() {
    const { financingTable, cashflowTable, taxTable, profitTable } = this.props
    const chartData = {
            labels: financingTable.map((row, i) => i + 1),
            datasets: [
            {
              label: "Einnahmen",
              type:'bar',
              data: cashflowTable.map((row, i) => row.revenueYearly),
              fill: false,
              // borderColor: '#6fcb9f',
              borderWidth: 0,
              backgroundColor: '#ADE3F4',
              yAxisID: 'y-axis-1'
            }, {
              label: "Zins",
              type:'bar',
              data: financingTable.map((row) => -row.borrowingRate),
              pointBorderWidth: 0,
              fill: false,
              // borderColor: '#AADEF0',
              borderWidth: 0,
              backgroundColor: '#EBBFFF',
              yAxisID: 'y-axis-1'
            }, {
              label: "Tilgung",
              type:'bar',
              data: financingTable.map((row) => -row.amortizationRate),
              pointBorderWidth: 0,
              fill: false,
              // borderColor: '#FCE88B',
              borderWidth: 0,
              backgroundColor: '#DBA4FF',
              yAxisID: 'y-axis-1'
            }, {
              label: "Unterhalt",
              type:'bar',
              data: cashflowTable.map((row) => -row.costYearly),
              fill: false,
              // borderColor: '#F26363',
              borderWidth: 0,
              backgroundColor: '#FFA4D7',
              yAxisID: 'y-axis-1'
            }, {
              label: "Steuern",
              type:'bar',
              data: taxTable.map((row) => row.differenceYearly),
              fill: false,
              // borderColor: '#F26363',
              borderWidth: 0,
              backgroundColor: '#F5DD90',
              yAxisID: 'y-axis-1'
            }, {
              type: 'line',
              label: "Gewinn",
              data: profitTable.map((row) => row.profitYearly),
              radius: 0,
              fill: false,
              borderColor: '#474747',
              borderWidth: 0,
              backgroundColor: '#474747',
              yAxisID: 'y-axis-1'
            }
            // , {
            //   label: "Restschuld",
            //   type:'line',
            //   data: financingTable.map((row) => row.dept),
            //   fill: false,
            //   borderColor: '#A80000',
            //   backgroundColor: '#A80000',
            //   pointBorderColor: '#A80000',
            //   pointBackgroundColor: '#A80000',
            //   pointHoverBackgroundColor: '#A80000',
            //   pointHoverBorderColor: '#A80000',
            //   yAxisID: 'y-axis-2'
            // }
           ]
        }
        const chartOptions = {
          responsive: false,
          tooltips: {
            mode: 'label',
            callbacks: {
              title: (tooltipItem, data) => tooltipItem[0].xLabel + ". Jahr",
              label: (tooltipItem, data) => " " + tooltipItem.yLabel.toFixed(2).replace(".", ",") + " €"
            }
          },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [{
              stacked: true,
              display: true,
              gridLines: {
                display: false
              },
              labels: {
                show: true,
              }
            }],
            yAxes: [{
              stacked: true,
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
              gridLines:{
                display: true
              },
              labels: {
                show:true,
              },
              // scaleLabel: {
              //   display: true,
              //   labelString: "Rate"
              // },
              ticks: {
                callback: (value, index, values) => value.toFixed(0) + " €"
              }
            }
            // ,{
            //   type: "linear",
            //   display: false,
            //   position: "left",
            //   id: "y-axis-2",
            //   gridLines:{
            //     display: false
            //   },
            //   labels: {
            //     show:false,
            //   },
            //   scaleLabel: {
            //     display: false,
            //     labelString: "Restschuld"
            //   },
            //   ticks: {
            //     callback: (value, index, values) => value.toFixed(0) + " €"
            //   }
            // }
            ]
          }
        }
    return (
      <Panel header="Graphische Darstellung">
        <BarChart width={800} height={300} chartData={chartData} chartOptions={chartOptions}/>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    financingTable: state.financingTable,
    cashflowTable: state.cashflowTable,
    profitTable: state.profitTable,
    taxTable: state.taxTable,
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
