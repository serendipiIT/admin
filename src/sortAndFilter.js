function genericSort(key) {
  return function (productA, productB) {
    if (typeof productA === 'string') {
      if (productA[key].toLocaleLowerCase > productB[key].toLocaleLowerCase) return 1
      if (productA[key].toLocaleLowerCase < productB[key].toLocaleLowerCase) return -1
      return 0
    } else {
      if (productA[key] > productB[key]) return 1
      if (productA[key] < productB[key]) return -1
      return 0
    }
  }
}

export const byActive = genericSort('active')
export const byCategory = genericSort('category2')
export const byId = genericSort('id')
export const byPrice = genericSort('price')
export const byStock = genericSort('stock')
export const byTitle = genericSort('title')
