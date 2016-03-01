import { PropTypes } from 'react'

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

  // calculated:
  rentPerSquareMeter: PropTypes.number, // Miete/Quadratmeter
  netPricePerSquareMeter: PropTypes.number, // Nettokaufpreis/Quadratmeter
  incidentalCosts: PropTypes.number, // Kaufnebenkosten
  totalPrice: PropTypes.number, // Netto Kaufpreis
  purchasingPriceFactor: PropTypes.number, // Kaufpreisfaktor (Kaufpreis / Jährl. Mieteinnahmen)

})
