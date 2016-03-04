import { PropTypes } from 'react'

// user defined
export const BaseData = PropTypes.shape({
  // core data
  squareMeters: PropTypes.number, // Quadratmeter
  grossPrice: PropTypes.number, // Brutto Kaufpreis
  baseRent: PropTypes.number, // Kaltmiete
  HOAFee: PropTypes.number, // homeowners' association fee = Hausgeld

  // incidenialCosts parameters
  commissionPercent: PropTypes.number, // Courtage %
  realEstateTransferTaxPercent: PropTypes.number, // Grunderwerbsteuer %
  notaryCostPercent: PropTypes.number, // Notarkosten %
  landRegisterCostPercent: PropTypes.number, // Grundbuch-Eintrag %

  // financing
  equityPercent: PropTypes.number, // Eigenkapital %
  fixedBorrowingRateYears: PropTypes.number, // Sollzinsbindung in Jahren
  borrowingRatePercent: PropTypes.number, // Sollzins %
  amortizationRatePercent: PropTypes.number, // Tilgungsrate %
  followUpBorrowingRatePercent: PropTypes.number, // Anschlusszinssatz
})

// calculated
export const Prices = PropTypes.shape({
  purchasingPriceFactor: PropTypes.string.isRequired, // Kaufpreisfaktor (Kaufpreis / Jährl. Mieteinnahmen)
  incidentalCosts: PropTypes.string.isRequired, // Kaufnebenkosten
  incidentalCostsPercent: PropTypes.string.isRequired, // Anteil Kaufnebenkosten von Brutto Kaufpreis
  netPricePerSquareMeter: PropTypes.string.isRequired, // Nettokaufpreis/Quadratmeter
  rentPerSquareMeter: PropTypes.string.isRequired, // Miete/Quadratmeter
  totalPrice: PropTypes.number, // Netto Kaufpreis
  equity: PropTypes.number, // Eigenkapital
  loan: PropTypes.number, // Darlehen
})
