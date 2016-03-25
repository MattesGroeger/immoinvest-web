import { expect } from 'chai'

import reducer from '../../src/reducers/profitTable'
import { CALCULATE_PROFIT_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate profit', function () {
    const baseData = {
      investmentPeriod: 3
    }

    const prices = {
      equity: 10000,
    }

    const cashflowTable = [
      {
        revenueYearly: 3000,
        costYearly: 5000,
      },
      {
        revenueYearly: 10000,
        costYearly: 5000,
      },
      {
        revenueYearly: 12000,
        costYearly: 6000,
      }
    ]

    const taxTable = [
      {
        differenceYearly: 0
      },
      {
        differenceYearly: -100
      },
      {
        differenceYearly: 100
      }
    ]

    const financingTable = [
      {
        totalRate: 3000
      },
      {
        totalRate: 3000
      },
      {
        totalRate: 3000
      }
    ]

    const result = reducer(undefined, {
      type: CALCULATE_PROFIT_TABLE,
      baseData: baseData,
      prices: prices,
      financingTable: financingTable,
      cashflowTable: cashflowTable,
      taxTable: taxTable,
    })

    expect(result).to.have.lengthOf(3)
    expect(result).to.deep.equal([
      {
        profitYearly: -5000,
        totalGain: 0,
        totalLoss: 15000,
        roi: -0.5,
      },
      {
        profitYearly: 1900,
        totalGain: 1900,
        totalLoss: 15000,
        roi: 0.19,
      },
      {
        profitYearly: 3100,
        totalGain: 5000,
        totalLoss: 15000,
        roi: 0.31,
      }
    ])
  });
});
