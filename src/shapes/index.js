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
  specialYearlyPayment: PropTypes.number, // Jährliche Sonderzahlung in €

  // development
  investmentPeriod: PropTypes.number, // Anlagedauer in Jahren
  inflationPercent: PropTypes.number, // Inflation %
  apportionableHOAFeePercent: PropTypes.number, // Umlagefähiger Hausgeldanteil %
  costFactorPercent: PropTypes.number, // Kostenfaktor auf Basis des Kaufpreises %
  yearlyRentIncrease: PropTypes.number, // Jährliche Mieterhöhung %
  landPortionPercent: PropTypes.number, // Bodenanteil %
  landDevelopmentPercent: PropTypes.number, // Wertentwicklung Boden %
  flatDevelopmentPercent: PropTypes.number, // Wertentwicklung Wohnung %

  // tax – AfA needs baseRent (keine Abschreibung bei Eigennutz)!
  taxType: PropTypes.string, // Neubau-AfA (2%/50 Jahre), Altbau-AfA (ab 1925: 2%/50 Jahre, vor 1925: 2,5%/40 Jahre), Denkmal-AfA (http://ratgeber.immowelt.de/a/steuern-sparen-mit-immobilien-afa-nutzen.html)
  married: PropTypes.bool, // Verheiratet
  taxableYearlyIncome: PropTypes.number, // Zu versteuerndes Jahreseinkommen
  incomeDevelopmentPercent: PropTypes.number, // Einkommensentwicklung
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

export const FeatureToggle = PropTypes.shape({
  incidentalCostsFeature: PropTypes.bool.isRequired,
  financingFeature: PropTypes.bool.isRequired,
})

export const Table = PropTypes.arrayOf(TableRow)

export const TableRow = PropTypes.shape({
  year: PropTypes.number.isRequired, // Jahr

  // financing
  dept: PropTypes.number.isRequired, // Schuldenstand
  borrowingRate: PropTypes.number.isRequired, // Rate Zinsen
  amortizationRate: PropTypes.number.isRequired, // Rate Tilgung
  totalRate: PropTypes.number.isRequired, // Rate Gesamt
  remainingDept: PropTypes.number.isRequired, // Restschuld
})

export const CashflowTableRow = PropTypes.shape({
  revenueYearly: PropTypes.number.isRequired, // Einnahmen pro Jahr
  costYearly: PropTypes.number.isRequired, // Ausgaben pro Jahr
})

export const TaxTableRow = PropTypes.shape({
  depreciationYearly: PropTypes.number.isRequired, // Abschreibung nach AfA
  taxableIncomeYearly: PropTypes.number.isRequired, // Einkommen pro Jahr mit Einrechnung der Einkommensentwicklung
  totalTaxableIncomeYearly: PropTypes.number.isRequired, // Neues zu versteuerndes Jahreseinkommen
  differenceYearly: PropTypes.number.isRequired, // Unterschied zur normalen Versteuerung ohne Immobilie (Gewinn/Verlust)
})

export const ProfitTableRow = PropTypes.shape({
  profitYearly: PropTypes.number.isRequired, // Gewinn pro Jahr
})
