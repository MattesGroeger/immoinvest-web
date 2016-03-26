import { expect } from 'chai'

import reducer from '../../src/reducers/developmentTable'
import { CALCULATE_DEVELOPMENT_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate development', function () {
    const baseData = {
      investmentPeriod: 2,
      grossPrice: 10000,
      landPortionPercent: 0.25,
      landDevelopmentPercent: 0.02,
      flatDevelopmentPercent: -0.02,
    }

    const result = reducer(undefined, {
      type: CALCULATE_DEVELOPMENT_TABLE,
      baseData: baseData,
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        landValue: 2550,
        flatValue: 7350,
        totalValue: 9900,
      },
      {
        landValue: 2601,
        flatValue: 7202.999999999999,
        totalValue: 9804,
      }
    ])
  });
});
