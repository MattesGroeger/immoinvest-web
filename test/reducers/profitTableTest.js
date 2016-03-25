import { expect } from 'chai'

import reducer from '../../src/reducers/profitTable'
import { CALCULATE_PROFIT_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate profit', function () {
    const baseData = {
      investmentPeriod: 2
    }

    const cashflowTable = [
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
      }
    ]

    const result = reducer(undefined, {
      type: CALCULATE_PROFIT_TABLE,
      baseData: baseData,
      financingTable: financingTable,
      cashflowTable: cashflowTable,
      taxTable: taxTable,
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        profitYearly: 1900
      },
      {
        profitYearly: 3100
      }
    ])
  });
});
