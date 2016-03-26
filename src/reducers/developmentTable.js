import { CALCULATE_DEVELOPMENT_TABLE } from '../actions/index'

const initialState = []

function multiplyPercentForYear(value = 0, percent, year) {
  return value * Math.pow(1 + percent, year)
}

function calculateDevelopmentRows(baseData, totalRows = 0, accumulator = []) {
  if (accumulator.length >= totalRows) { return accumulator }

  const currentYear = accumulator.length + 1

  const { grossPrice, landPortionPercent, landDevelopmentPercent, flatDevelopmentPercent } = baseData
  const landAmount = grossPrice * landPortionPercent
  const flatAmount = grossPrice * (1 - landPortionPercent)

  const landValue = multiplyPercentForYear(landAmount, landDevelopmentPercent, currentYear)
  const flatValue = multiplyPercentForYear(flatAmount, flatDevelopmentPercent, currentYear)
  const totalValue = landValue + flatValue

  accumulator.push({
    landValue: landValue,
    flatValue: flatValue,
    totalValue: totalValue,
  })

  return calculateDevelopmentRows(baseData, totalRows, accumulator)
}

export default function table(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_DEVELOPMENT_TABLE:
      return calculateDevelopmentRows(action.baseData, action.baseData.investmentPeriod)
    default:
      return state
  }
}
