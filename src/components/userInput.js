import React, { Component, PropTypes } from 'react'

export class UserInput extends React.Component {
  render() {
    const { value } = this.props
    return (
      <input
        type="text"
        onChange={this.handleChange.bind(this)}
        defaultValue={this.formatValue(value)}/>
    )
  }

  handleChange(event) {
    this.props.onValueChange(this.parseValue(event.target.value))
  }

  formatValue(value) {
    if (value == undefined) {
      return ""
    }
    switch (this.props.type) {
      case "integer":
        return value.toFixed(0)
      case "percent":
        return (value * 100).toFixed(1).replace(".",",")
      case "currency":
        return (value).toFixed(2).replace(".",",")
      default:
        return value
    }
  }

  parseValue(value) {
    switch (this.props.type) {
      case "integer":
        return parseInt(value.replace(",","."))
      case "percent":
        return parseFloat(value.replace(",","."))/100
      case "currency":
        return parseFloat(value.replace(",","."))
      default:
        return value
    }
  }
}

UserInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number
}
