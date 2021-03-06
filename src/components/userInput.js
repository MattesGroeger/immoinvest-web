import React, { Component, PropTypes } from 'react'
import { Input } from 'react-bootstrap'

class UserInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: undefined, input: ""}
  }

  render() {
    const { disabled, addonBefore, addonAfter, label } = this.props
    return (
      <Input
        type="text"
        valueLink={this.valueLink()}
        disabled={disabled}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        label={label}
      />
    )
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
  disabled: PropTypes.string,
  addonBefore: PropTypes.boolean
}

UserInput.defaultProps = {
  disabled: false,
  addonBefore: "",
  addonAfter: "",
  label: "",
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

export class MultiplyInput extends FloatUserInput {
  fromModelValue(value) {
    return super.fromModelValue((value || 0) * (this.props.multiplicant || 0))
  }
  toModelValue(value) {
    if (this.props.multiplicant == 0) {
      return 0
    }
    return super.toModelValue(value) / this.props.multiplicant
  }
}

MultiplyInput.propTypes = { multiplicant: PropTypes.number }
MultiplyInput.defaultProps = { multiplicant: 1 }

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

  fromModelValue(value) {
    if (value == undefined) { return "" }
    const maxRange = this.props.max - this.props.min
    const newValue = ((value * this.props.multiplier) - this.props.min) / maxRange
    return Math.max(Math.min(newValue * 100, 100), 0).toFixed(0)
  }

  toModelValue(value) {
    const maxRange = this.props.max - this.props.min
    const modelValue = ((parseFloat(value) / 100 * maxRange) + this.props.min) / this.props.multiplier
    return this.props.round ? Math.round(modelValue) : modelValue
  }

  render() {
    return (
      <input
        type="range"
        valueLink={this.valueLink()}
        disabled={this.props.disabled}
      />
    )
  }
}

RangeUserInput.propTypes = { min: PropTypes.number, max: PropTypes.number, multiplier: PropTypes.number, round: PropTypes.bool }
RangeUserInput.defaultProps = { min: 0, max: 100, multiplier: 1, round: false }
