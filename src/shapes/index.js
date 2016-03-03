import { PropTypes } from 'react'

// user defined
export const BaseData = PropTypes.shape({
  // base data:
  id: PropTypes.number.isRequired,
  squareMeters: PropTypes.number, // Quadratmeter
  grossPrice: PropTypes.number, // Brutto Kaufpreis
  baseRent: PropTypes.number, // Kaltmiete
  HOAFee: PropTypes.number, // homeowners' association fee = Hausgeld
  commission: PropTypes.number, // Courtage

  // parameters:
  realEstateTransferTaxPercent: PropTypes.number, // Grunderwerbsteuer
  notaryCostPercent: PropTypes.number, // Anteil Notarkosten
  landRegisterCostPercent: PropTypes.number, // Anteil Grundbuch-Eintrag
})

// calculated
export const Prices = PropTypes.shape({
  purchasingPriceFactor: PropTypes.string.isRequired, // Kaufpreisfaktor (Kaufpreis / Jährl. Mieteinnahmen)
  incidentalCosts: PropTypes.string.isRequired, // Kaufnebenkosten
  incidentalCostsPercent: PropTypes.string.isRequired, // Anteil Kaufnebenkosten von Brutto Kaufpreis
  netPricePerSquareMeter: PropTypes.string.isRequired, // Nettokaufpreis/Quadratmeter
  rentPerSquareMeter: PropTypes.string.isRequired, // Miete/Quadratmeter
  totalPrice: PropTypes.number, // Netto Kaufpreis
})
