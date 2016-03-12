import { expect } from 'chai'

import reducer from '../../src/reducers/developmentTable'
import { CALCULATE_DEVELOPTMENT_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate developments', function () {
    const baseData = {
      investmentPeriod: 2,
      grossPrice: 72500,
      baseRent: 340,
      HOAFee: 190,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.01,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        revenueYearly: 4181.999999999999,
        costYearly: 1553.46,
        profitYearly: 2628.539999999999,
      },
      {
        revenueYearly: 4286.549999999999,
        costYearly: 1584.5292,
        profitYearly: 2702.0207999999993
      }
    ])
  });

  it('should subtract apportionableHOAFee from cost only for the amount of baseRent', function () {
    const baseData = {
      investmentPeriod: 2,
      grossPrice: 72500,
      baseRent: 200,
      HOAFee: 190,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.01,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        revenueYearly: 2459.9999999999995,
        costYearly: 1553.46,
        profitYearly: 906.5399999999995,
      },
      {
        revenueYearly: 2521.4999999999995,
        costYearly: 1584.5292,
        profitYearly: 936.9707999999996
      }
    ])
  });

  it('should not fail if baseRent is undefined', function () {
    const baseData = {
      investmentPeriod: 1,
      grossPrice: 72500,
      HOAFee: 190,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.01,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })

    expect(result).to.have.lengthOf(1)
    expect(result).to.deep.equal([
      {
        revenueYearly: 0,
        costYearly: 3065.1000000000004,
        profitYearly: -3065.1000000000004,
      }
    ])
  });

  it('should not fail if HOAFee is undefined', function () {
    const baseData = {
      investmentPeriod: 1,
      grossPrice: 72500,
      baseRent: 340,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.01,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })

    expect(result).to.have.lengthOf(1)
    expect(result).to.deep.equal([
      {
        revenueYearly: 4181.999999999999,
        costYearly: 739.5,
        profitYearly: 3442.499999999999,
      }
    ])
  });

  it('should not fail if grossPrice is undefined', function () {
    const baseData = {
      investmentPeriod: 1,
      baseRent: 340,
      inflationPercent: 0.02,
      apportionableHOAFeePercent: 0.65,
      costFactorPercent: 0.2,
      yearlyRentIncrease: 0.025,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPTMENT_TABLE,
      baseData: baseData
    })

    expect(result).to.have.lengthOf(1)
    expect(result).to.deep.equal([
      {
        revenueYearly: 4181.999999999999,
        costYearly: 0,
        profitYearly: 4181.999999999999,
      }
    ])
  });
});
