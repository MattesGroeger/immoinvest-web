import { expect } from 'chai'

import reducer from '../../src/reducers/taxTable'
import { CALCULATE_TAX_TABLE } from '../../src/actions/index'

var assert = require('assert');

describe('TaxTable Reducer', function() {

  it('should calculate tax', function () {
    const baseData = {
      investmentPeriod: 2,
      landPortionPercent: 0.25,
      taxType: "oldFrom1925",
      married: false,
      taxableYearlyIncome: 50000,
      incomeDevelopmentPercent: 0.025,
    }

    const prices = {
      totalPrice: 100000,
    }

    const cashflowTable = [
      { revenueYearly: 4800 },
      { revenueYearly: 5000 },
    ]

    const financingTable = [
      { borrowingRate: 3000 },
      { borrowingRate: 2600 },
    ]

    const result = reducer(undefined, {
      type: CALCULATE_TAX_TABLE,
      baseData: baseData,
      prices: prices,
      financingTable: financingTable,
      cashflowTable: cashflowTable
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        depreciationYearly: 1500,
        taxableIncomeYearly: 51249.99999999999,
        totalTaxableIncomeYearly: 51549.99999999999,
        differenceYearly: -122.93740439999965,
      },
      {
        depreciationYearly: 1500,
        taxableIncomeYearly: 52531.24999999999,
        totalTaxableIncomeYearly: 53431.24999999999,
        differenceYearly: -375.230703600002,
      }
    ])
  });

  it('should not calculate tax without baseRent', function () {
    const baseData = {
      investmentPeriod: 2,
      landPortionPercent: 0.25,
      taxType: "oldFrom1925",
      married: false,
      taxableYearlyIncome: 50000,
      incomeDevelopmentPercent: 0.025,
    }

    const prices = {
      totalPrice: 100000,
    }

    const cashflowTable = [
      { revenueYearly: 0 },
      { revenueYearly: 0 },
    ]

    const financingTable = [
      { borrowingRate: 3000 },
      { borrowingRate: 2600 },
    ]

    const result = reducer(undefined, {
      type: CALCULATE_TAX_TABLE,
      baseData: baseData,
      prices: prices,
      financingTable: financingTable,
      cashflowTable: cashflowTable
    })

    expect(result).to.have.lengthOf(2)
    expect(result).to.deep.equal([
      {
        depreciationYearly: 0,
        taxableIncomeYearly: 51249.99999999999,
        totalTaxableIncomeYearly: 51249.99999999999,
        differenceYearly: 0,
      },
      {
        depreciationYearly: 0,
        taxableIncomeYearly: 52531.24999999999,
        totalTaxableIncomeYearly: 52531.24999999999,
        differenceYearly: 0,
      }
    ])
  });
});
