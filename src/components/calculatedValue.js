import React, { Component, PropTypes } from 'react'

class CalculatedValue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {change: "equal"}
  }

  componentWillReceiveProps(nextProp) {
    // const { value } = this.props
    this.setState({
      // change: nextProp.value > value ? (invert ? "worse" : "better") : nextProp.value < value ? (invert ? "better" : "worse") : "equal"
      change: this.calculateChange(this.props.value, nextProp.value)
    })
  }

  calculateChange(oldValue, newValue) {
    if (isNaN(oldValue) || oldValue == 0 && newValue != 0) {
      return this.cssSelector(1)
    }
    if (oldValue != 0 && isNaN(newValue) || newValue == 0) {
      return this.cssSelector(0)
    }
    return this.cssSelector(this.round(newValue) - this.round(oldValue))
  }

  round(value) {
    return Math.round(value * 100) / 100
  }

  cssSelector(change) {
    const { invert } = this.props
    return change < 0 ? (invert ? "better" : "worse") : change > 0 ? (invert ? "worse" : "better") : "equal"
  }
}

export class CalculatedFactorValue extends CalculatedValue {
  render() {
    if (this.props.value == 0) {
      return <span>?</span>
    } else {
      const formattedValue = (this.props.value || 0).toFixed(2).replace(".", ",")
      return (
        <span className={this.state.change}>{formattedValue}</span>
      )
    }
  }
}

export class CalculatedCurrencyValue extends CalculatedValue {
  render() {
    const formattedValue = (this.props.value || 0).toFixed(2).replace(".", ",")
    return (
      <span className={this.state.change}>{formattedValue} €</span>
    )
  }
}

export class CalculatedPercentValue extends CalculatedValue {
  render() {
    const precision = this.props.precision == undefined ? 2 : this.props.precision
    const formattedValue = ((this.props.value || 0) * 100).toFixed(precision).replace(".", ",")
    return (
      <span className={this.state.change}>{formattedValue} %</span>
    )
  }
}

CalculatedFactorValue.propTypes = {
  value: PropTypes.number.isRequired,
  invert: PropTypes.bool
}

CalculatedCurrencyValue.propTypes = {
  value: PropTypes.number.isRequired
}

CalculatedPercentValue.propTypes = {
  value: PropTypes.number.isRequired,
  precision: PropTypes.number
}
