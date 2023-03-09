function genericSort(key) {
  return function (productA, productB) {
    if (productA[key] > productB[key]) return 1
    if (productA[key] < productB[key]) return -1
    return 0
  }
}

export const byPrice = genericSort('price')
export const byStock = genericSort('stock')
export const byId = genericSort('id')
export const byTitle = genericSort('title')
