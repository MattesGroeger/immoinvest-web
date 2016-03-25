const STAGES = [8652, 13669, 53665, 254446]

// http://www.gesetze-im-internet.de/estg/__32a.html
const wageTax = (income) => {
  if (income > STAGES[3]) {
    return 0.45 * Math.floor(income) - 16027.52
  } else if (income > STAGES[2]) {
    return 0.42 * Math.floor(income) - 8394.14
  } else if (income > STAGES[1]) {
    const z = (Math.floor(income) - STAGES[1] + 1) / 10000
    return (225.40 * z + 2397) * z + 952.48
  } else if (income > STAGES[0]) {
    const y = (Math.floor(income) - STAGES[0] + 1) / 10000
    return (993.62 * y + 1400) * y
  } else {
    return 0
  }
}

export default wageTax
