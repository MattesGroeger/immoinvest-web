export const CHANGE_BASE_DATA_GROSS_PRICE = 'CHANGE_BASE_DATA_GROSS_PRICE'

export const changeBaseDataGrossPrice = (grossPrice) => {
  return {
    type: CHANGE_BASE_DATA_GROSS_PRICE,
    grossPrice: grossPrice
  }
}

// export const changeBaseData = (baseData) => {
//   return {
//     type: "CHANGE_BASE_DATA",
//     id: baseData.id,
//     zipCode: baseData.zipCode,
//     squareMeters: baseData.squareMeters,
//     grossPrice: baseData.grossPrice,
//     baseRent: baseData.baseRent,
//     HOAFee: baseData.HOAFee,
//     commission: baseData.commission
//   }
// }
