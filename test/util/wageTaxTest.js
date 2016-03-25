import { expect } from 'chai'

import calculateTax from '../../src/util/wageTax'

var assert = require('assert');

describe('WageTaxCalculator', function() {

  it('should calculate tax', function () {
     expect(Math.floor(calculateTax(0))).to.equal(0)
     expect(Math.floor(calculateTax(13000))).to.equal(796)
     expect(Math.floor(calculateTax(13600))).to.equal(936)
     expect(Math.floor(calculateTax(13700))).to.equal(960)
     expect(Math.floor(calculateTax(19000))).to.equal(2294)
     expect(Math.floor(calculateTax(43000))).to.equal(9922)
     expect(Math.floor(calculateTax(60000))).to.equal(16805)
  });
});
