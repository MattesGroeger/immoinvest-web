import { expect } from 'chai'

import reducer from '../../src/reducers/developmentTable'
import { CALCULATE_DEVELOPTMENT_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate developments', function () {
    const baseData = {
      investmentPeriod: 2,
      baseRent: 340,
      HOAFee: 190,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.2,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })
    console.log(result)

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        revenueYearly: 4181.999999999999,
        costYearly: 1650.3599999999997,
        profitYearly: 2531.6399999999994,
      },
      {
        revenueYearly: 4286.549999999999,
        costYearly: 1687.5492,
        profitYearly: 2599.0007999999993
      }
    ])
  });
});
