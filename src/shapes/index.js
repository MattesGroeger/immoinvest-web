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
  fixedBorrowingRateYears: ValueObject, // Sollzinsbindung in Jahren
  borrowingRatePercent: ValueObject, // Sollzins %
  amortizationRatePercent: ValueObject, // Tilgungsrate %
  followUpBorrowingRatePercent: ValueObject, // Anschlusszinssatz
  specialYearlyPayment: ValueObject, // Jährliche Sonderzahlung in €
})

export const ValueObject = PropTypes.shape({
  value: PropTypes.number,
  text: PropTypes.string,
  range: PropTypes.string
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
  monthlyRate: PropTypes.number, // Monatsrate
  monthlyFollowUpRate: PropTypes.number, // Monatsrate nach Ende Zinsbindung
  specialYearlyPaymentPercent: PropTypes.number, // Jährliche Sondertilgungsrate
})

export const Table = PropTypes.arrayOf(TableRow)

export const TableRow = PropTypes.shape({
  year: PropTypes.number.isRequired, // Jahr
  dept: PropTypes.number.isRequired, // Schuldenstand
  borrowingRate: PropTypes.number.isRequired, // Rate Zinsen
  amortizationRate: PropTypes.number.isRequired, // Rate Tilgung
  totalRate: PropTypes.number.isRequired, // Rate Gesamt
  remainingDept: PropTypes.number.isRequired, // Restschuld
})
