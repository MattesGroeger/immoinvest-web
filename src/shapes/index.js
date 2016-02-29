import { PropTypes } from 'react'

export const BaseData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  zipCode: PropTypes.number, // PLZ
  squareMeters: PropTypes.number, // Quadratmeter
  grossPrice: PropTypes.number, // Brutto Kaufpreis
  baseRent: PropTypes.number, // Kaltmiete
  HOAFee: PropTypes.number, // homeowners' association fee = Hausgeld
  commission: PropTypes.number // Courtage
})
