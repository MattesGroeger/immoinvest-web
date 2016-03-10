import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Prices } from '../../shapes/index'
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
    const { purchasingPriceFactor, incidentalCosts, incidentalCostsPercent, netPricePerSquareMeter, rentPerSquareMeter, equity, loan, table } = this.props
    const chartData = {
            labels: table.map((row) => row.year),
            datasets: [{
              type: 'bar',
              label: "Zinsen",
              data: table.map((row) => row.borrowingRate),
              fill: false,
              borderColor: '#AADEF0',
              backgroundColor: '#AADEF0',
              yAxisID: 'y-axis-1',
            }, {
              label: "Tilgung",
              type:'bar',
              data: table.map((row) => row.amortizationRate),
              fill: false,
              borderColor: '#FFDA82',
              backgroundColor: '#FFDA82',
              yAxisID: 'y-axis-1'
            }, {
              label: "Restschuld",
              type:'line',
              data: table.map((row) => row.dept),
              fill: false,
              borderColor: '#A80000',
              backgroundColor: '#A80000',
              pointBorderColor: '#A80000',
              pointBackgroundColor: '#A80000',
              pointHoverBackgroundColor: '#A80000',
              pointHoverBorderColor: '#A80000',
              yAxisID: 'y-axis-2'
            } ]
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
              scaleLabel: {
                display: true,
                labelString: "Rate"
              },
              ticks: {
                callback: (value, index, values) => value.toFixed(0) + " €"
              }
            },{
              type: "linear",
              display: true,
              position: "right",
              id: "y-axis-2",
              gridLines:{
                display: false
              },
              labels: {
                show:true,
              },
              scaleLabel: {
                display: true,
                labelString: "Restschuld"
              },
              ticks: {
                callback: (value, index, values) => value.toFixed(0) + " €"
              }
            }]
          }
        }
    return (
      <div>
        <BarChart width={800} height={300} chartData={chartData} chartOptions={chartOptions}/>
        <ul>
          <li>Kaufpreisfaktor: <strong><CalculatedFactorValue value={purchasingPriceFactor} invert={true}/></strong> ({"<"} 15-20)</li>
          <li>Netto-Kaufpreis/m²: <strong><CalculatedCurrencyValue value={netPricePerSquareMeter} invert={true}/></strong></li>
          <li>Miete/m²: <strong><CalculatedCurrencyValue value={rentPerSquareMeter}/></strong></li>
          <hr/>
          <li>Eigenkapital: <strong><CalculatedCurrencyValue value={equity} invert={true}/></strong></li>
          <li>Nebenkosten: <strong><CalculatedCurrencyValue value={incidentalCosts} invert={true}/></strong> (<CalculatedPercentValue value={incidentalCostsPercent} invert={true} precision={0}/>)</li>
          <li>Darlehen: <strong><CalculatedCurrencyValue value={loan} invert={true}/></strong></li>
        </ul>
      </div>
    )
  }
}

GraphView.propTypes = Prices.isRequired

function mapStateToProps(state) {
  return {
    purchasingPriceFactor: state.prices.purchasingPriceFactor,
    incidentalCosts: state.prices.incidentalCosts,
    incidentalCostsPercent: state.prices.incidentalCostsPercent,
    netPricePerSquareMeter: state.prices.netPricePerSquareMeter,
    rentPerSquareMeter: state.prices.rentPerSquareMeter,
    equity: state.prices.equity,
    loan: state.prices.loan,
    table: state.table
  }
}

export default connect(
  mapStateToProps,
  {}
)(GraphView)
