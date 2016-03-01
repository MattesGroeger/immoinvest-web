export const CHANGE_BASE_DATA = 'CHANGE_BASE_DATA'

export const changeBaseData = (property, value) => {
  return {
    type: CHANGE_BASE_DATA,
    property: property,
    value: value
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
