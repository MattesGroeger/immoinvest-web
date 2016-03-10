import React, { Component, PropTypes } from 'react'

class UserInput extends React.Component {
  constructor(props) {
    super(props)
    this.type = "text"
    this.state = {value: undefined, input: ""}
  }

  render() {
    const { size, disabled } = this.props
    return <input type={this.type} valueLink={this.valueLink()} size={size} disabled={disabled}/>
  }

  valueLink() {
    return {
      value: this.currentValue(),
      requestChange: this.handleChange.bind(this)
    }
  }

  currentValue() {
    return (this.props.value != this.state.value) ? this.fromModelValue(this.props.value) : this.state.input
  }

  handleChange(input) {
    const { changeBaseData, property } = this.props
    const newValue = this.toModelValue(input)
    changeBaseData(property, newValue)
    this.setState({
      value: newValue,
      input: input})
  }

  // 2.0 => 2,0
  fromModelValue(value) {
    if (value == undefined) { return "" }
    return value.toString().replace(".",",")
  }

  // 2,14 => 2.14
  toModelValue(value) {
    return parseFloat(value.replace(",",".")) || 0
  }
}

UserInput.propTypes = {
  changeBaseData: PropTypes.func.isRequired,
  value: PropTypes.number,
  property: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.string,
}

UserInput.defaultProps = {
  disabled: false
}

/**
 * FloatUserInput
 */

export class FloatUserInput extends UserInput {

  // 2.0 => 2,00
  fromModelValue(value) {
    if (value == undefined) { return "" }
    return value.toFixed(this.props.digits).replace(".",",")
  }
}

FloatUserInput.propTypes = { digits: PropTypes.number }
FloatUserInput.defaultProps = { digits: 2 }

/**
 * PercentUserInput
 */

export class PercentUserInput extends UserInput {

  // 0.1 => 10,00
  fromModelValue(value) {
    if (value == undefined) { return "" }
    return (value * 100).toFixed(this.props.digits).replace(".",",")
  }

  // 2,14 => 0.0214
  toModelValue(value) {
    return parseFloat(value.replace(",","."))/100 || 0
  }
}

PercentUserInput.propTypes = { digits: PropTypes.number }
PercentUserInput.defaultProps = { digits: 2 }

/**
 * IntUserInput
 */

export class IntUserInput extends UserInput {

  // 1.0 => 1
  fromModelValue(value) {
    if (value == undefined) { return "" }
    return parseInt(value)
  }

  // 2,14 => 2
  toModelValue(value) {
    return parseInt(value.replace(",",".")) || 0
  }
}

IntUserInput.propTypes = { }
IntUserInput.defaultProps = { }

/**
 * RangeUserInput
 */

export class RangeUserInput extends UserInput {

  constructor(props) {
    super(props)
    this.type = "range"
  }

  fromModelValue(value) {
    if (value == undefined) { return "" }
    return (Math.min((value * 100) / this.props.max * this.props.multiplier, 100)).toFixed(0)
  }

  toModelValue(value) {
    return parseFloat(value) * this.props.max / 100 / this.props.multiplier
  }
}

RangeUserInput.propTypes = { min: PropTypes.number, max: PropTypes.number, multiplier: PropTypes.number }
RangeUserInput.defaultProps = { min: 0, max: 100, multiplier: 1 }
