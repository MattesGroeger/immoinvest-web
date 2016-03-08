import update from 'react-addons-update'

import { CHANGE_BASE_DATA } from '../actions/index'

const percent2Text  = (percent) => (percent * 100).toFixed(1).replace(".",",")
const percent2Range = (percent) => (percent * 100).toFixed(0)
const text2Percent  = (text) => parseFloat(text.replace(",",".")) / 100
const text2Range    = (text) => parseFloat(text.replace(",","."))
const range2Percent = (range) => range / 100
const range2Text    = (range) => parseInt(range).toFixed(1).replace(".",",")
const integer2Text  = (integer) => integer.toFixed(0)
const integer2Range = (integer) => integer.toFixed(0)

const range2Value   = (range, maxRange) => (parseFloat(range) / 100) * maxRange / 100
const value2Range   = (value, maxRange) => (Math.min((value * 100) / maxRange * 100, 100)).toFixed(0)


const config = {
  equityPercent: {
    range: {
      from: (v) => parseFloat(v) / 100,
      to: (v) => (v * 100).toFixed(0)
    },
    text: {
      from: (v) => parseFloat(v.replace(",",".")) / 100,
      to: (v) => (v * 100).toFixed(0)
    }
  },
  fixedBorrowingRateYears: {
    range: {
      from: parseInt,
      to: (v) => v
    },
    text: {
      from: parseInt,
      to: (v) => v
    }
  },
  borrowingRatePercent: {
    range: {
      from: (v) => range2Value(v, 15),
      to: (v) => value2Range(v, 15)
    },
    text: {
      from: text2Percent,
      to: percent2Text
    }
  },
  followUpBorrowingRatePercent: {
    range: {
      from: (v) => range2Value(v, 15),
      to: (v) => value2Range(v, 15)
    },
    text: {
      from: text2Percent,
      to: percent2Text
    }
  },
  amortizationRatePercent: {
    range: {
      from: (v) => range2Value(v, 15),
      to: (v) => value2Range(v, 15)
    },
    text: {
      from: text2Percent,
      to: percent2Text
    }
  },
  specialYearlyPayment: {
    range: {
      from: (v) => parseFloat(v) * 5000 / 100,
      to: (v) => (Math.min((v * 100) / 5000, 100)).toFixed(0)
    },
    text: {
      from: (v) => parseFloat(v.replace(",",".")),
      to: (v) => v.toFixed(2).replace(".",",")
    }
  }
}

const objectFromValue = (property, value) => {
  return {
    value: value,
    text: config[property].text.to(value),
    range: config[property].range.to(value)
  }
}

const objectFromText = (property, text) => {
  const value = config[property].text.from(text)
  return {
    value: value,
    text: text,
    range: config[property].range.to(value)
  }
}

const objectFromRange = (property, range) => {
  const value = config[property].range.from(range)
  return {
    value: value,
    text: config[property].text.to(value),
    range: range
  }
}

const initialState = {
  // squareMeters: 0,
  // grossPrice: 0,
  // baseRent: 0,
  // HOAFee: 0,

  commissionPercent: 0,
  realEstateTransferTaxPercent: 0.06,
  notaryCostPercent: 0.015,
  landRegisterCostPercent: 0.005,

  equityPercent: objectFromValue("equityPercent", 0.1),
  fixedBorrowingRateYears: objectFromValue("fixedBorrowingRateYears", 15),
  borrowingRatePercent: objectFromValue("borrowingRatePercent", 0.024),
  amortizationRatePercent: objectFromValue("amortizationRatePercent", 0.02),
  followUpBorrowingRatePercent: objectFromValue("followUpBorrowingRatePercent", 0.06),
  specialYearlyPayment: objectFromValue("specialYearlyPayment", 0),
}

const updateBaseData = (state, action) => {
  let obj = {}
  switch (action.subkey) {
    case "text":
      obj[action.key] = { $set: objectFromText(action.key, action.value) }
      break
    case "range":
      obj[action.key] = { $set: objectFromRange(action.key, action.value) }
      break
    default:
      obj[action.key] = { $set: action.value }
  }
  return update(state, obj)
}

const baseData = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BASE_DATA:
      return updateBaseData(state, action)
    default:
      return state
  }
}

export default baseData
