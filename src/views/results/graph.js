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
    const { table, developmentTable } = this.props
    const chartData = {
            labels: table.map((row) => row.year),
            datasets: [{
              type: 'bar',
              label: "Zinsen",
              data: table.map((row) => -row.borrowingRate),
              fill: false,
              borderColor: '#AADEF0',
              backgroundColor: '#AADEF0',
              yAxisID: 'y-axis-1',
            }, {
              label: "Tilgung",
              type:'bar',
              data: table.map((row) => -row.amortizationRate),
              fill: false,
              borderColor: '#FFDA82',
              backgroundColor: '#FFDA82',
              yAxisID: 'y-axis-1'
            }, {
              label: "Gewinn",
              type:'bar',
              data: developmentTable.map((row, i) => Math.max(row.profitYearly - table[i].totalRate,0)),
              fill: false,
              borderColor: '#C5E39F',
              backgroundColor: '#C5E39F',
              yAxisID: 'y-axis-1'
            }, {
              label: "Verlust",
              type:'bar',
              data: developmentTable.map((row, i) => Math.min(row.profitYearly - table[i].totalRate,0)),
              fill: false,
              borderColor: '#F26363',
              backgroundColor: '#F26363',
              yAxisID: 'y-axis-1'
            }
            // , {
            //   label: "Restschuld",
            //   type:'line',
            //   data: table.map((row) => row.dept),
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
            //   display: true,
            //   position: "right",
            //   id: "y-axis-2",
            //   gridLines:{
            //     display: false
            //   },
            //   labels: {
            //     show:true,
            //   },
            //   scaleLabel: {
            //     display: true,
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
        <Tabs defaultActiveKey={1} animation={false}>
          <Tab eventKey={1} title="Finanzierung">
            <BarChart width={800} height={300} chartData={chartData} chartOptions={chartOptions}/>
          </Tab>
          <Tab eventKey={2} title="Nebenkosten"><h4>In Arbeit</h4></Tab>
          <Tab eventKey={3} title="Wertentwicklung"><h4>In Arbeit</h4></Tab>
        </Tabs>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    table: state.table,
    developmentTable: state.developmentTable,
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
