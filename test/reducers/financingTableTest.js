import { expect } from 'chai'

import reducer from '../../src/reducers/financingTable'
import { CALCULATE_FINANCING_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('Reducer', function() {

  it('should calculate financing', function () {
    const baseData = {
      investmentPeriod: 2,
      fixedBorrowingRateYears: 15,
      borrowingRatePercent: 0.02,
      amortizationRatePercent: 0.02,
      followUpBorrowingRatePercent: 0.06,
      specialYearlyPayment: 0,
    }

    const prices = {
      loan: 100000
    }

    const result = reducer(undefined, {
      type: CALCULATE_FINANCING_TABLE,
      baseData: baseData,
      prices: prices,
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        dept: 100000,
        months: [
          { borrowingRate: 166.67,
            amortizationRate: 166.66,
            totalRate: 333.33,
            remainingDept: 99833.34 },
          { borrowingRate: 166.39,
            amortizationRate: 166.94,
            totalRate: 333.33,
            remainingDept: 99666.4 },
          { borrowingRate: 166.11,
            amortizationRate: 167.22,
            totalRate: 333.33,
            remainingDept: 99499.18 },
          { borrowingRate: 165.83,
            amortizationRate: 167.5,
            totalRate: 333.33,
            remainingDept: 99331.68 },
          { borrowingRate: 165.55,
            amortizationRate: 167.78,
            totalRate: 333.33,
            remainingDept: 99163.9 },
          { borrowingRate: 165.27,
            amortizationRate: 168.06,
            totalRate: 333.33,
            remainingDept: 98995.84 },
          { borrowingRate: 164.99,
            amortizationRate: 168.34,
            totalRate: 333.33,
            remainingDept: 98827.5 },
          { borrowingRate: 164.71,
            amortizationRate: 168.62,
            totalRate: 333.33,
            remainingDept: 98658.88 },
          { borrowingRate: 164.43,
            amortizationRate: 168.9,
            totalRate: 333.33,
            remainingDept: 98489.98 },
          { borrowingRate: 164.15,
            amortizationRate: 169.18,
            totalRate: 333.33,
            remainingDept: 98320.8 },
          { borrowingRate: 163.87,
            amortizationRate: 169.46,
            totalRate: 333.33,
            remainingDept: 98151.34 },
          { borrowingRate: 163.59,
            amortizationRate: 169.74,
            totalRate: 333.33,
            remainingDept: 97981.6 } ],
        borrowingRate: 1981.56,
        amortizationRate: 2018.4,
        specialYearlyPayment: 0,
        totalRate: 4000,
        remainingDept: 97981.6,
      },
      {
        dept: 97981.6,
        months: [
          { borrowingRate: 163.3,
            amortizationRate: 170.03,
            totalRate: 333.33,
            remainingDept: 97811.57 },
          { borrowingRate: 163.02,
            amortizationRate: 170.31,
            totalRate: 333.33,
            remainingDept: 97641.26 },
          { borrowingRate: 162.74,
            amortizationRate: 170.59,
            totalRate: 333.33,
            remainingDept: 97470.67 },
          { borrowingRate: 162.45,
            amortizationRate: 170.88,
            totalRate: 333.33,
            remainingDept: 97299.79 },
          { borrowingRate: 162.17,
            amortizationRate: 171.16,
            totalRate: 333.33,
            remainingDept: 97128.63 },
          { borrowingRate: 161.88,
            amortizationRate: 171.45,
            totalRate: 333.33,
            remainingDept: 96957.18 },
          { borrowingRate: 161.6,
            amortizationRate: 171.73,
            totalRate: 333.33,
            remainingDept: 96785.45 },
          { borrowingRate: 161.31,
            amortizationRate: 172.02,
            totalRate: 333.33,
            remainingDept: 96613.43 },
          { borrowingRate: 161.02,
            amortizationRate: 172.31,
            totalRate: 333.33,
            remainingDept: 96441.12 },
          { borrowingRate: 160.74,
            amortizationRate: 172.59,
            totalRate: 333.33,
            remainingDept: 96268.53 },
          { borrowingRate: 160.45,
            amortizationRate: 172.88,
            totalRate: 333.33,
            remainingDept: 96095.65 },
          { borrowingRate: 160.16,
            amortizationRate: 173.17,
            totalRate: 333.33,
            remainingDept: 95922.48 }
        ],
        borrowingRate: 1940.84,
        amortizationRate: 2059.12,
        specialYearlyPayment: 0,
        totalRate: 4000,
        remainingDept: 95922.48,
      }
    ])
  });

  // test special yearly payment
  // test financing ends before end of investment (0-values)

  it('should finish financing within investment period', function () {
    const baseData = {
      investmentPeriod: 10,
      fixedBorrowingRateYears: 10,
      borrowingRatePercent: 0.02,
      amortizationRatePercent: 0.2,
      followUpBorrowingRatePercent: 0.02,
      specialYearlyPayment: 0,
    }

    const prices = {
      loan: 100000
    }

    const result = reducer(undefined, {
      type: CALCULATE_FINANCING_TABLE,
      baseData: baseData,
      prices: prices,
    })

    expect(result).to.have.lengthOf(10)
    expect(result[9]).to.deep.equal({
        dept: 0,
        months: [
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
          { borrowingRate: 0, amortizationRate: 0, totalRate: 0, remainingDept: 0 },
        ],
        borrowingRate: 0,
        amortizationRate: 0,
        specialYearlyPayment: 0,
        totalRate: 0,
        remainingDept: 0,
      })
  });
});
