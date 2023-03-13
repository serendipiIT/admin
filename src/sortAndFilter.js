function genericSort(key) {
  return function (productA, productB) {
    if (typeof productA[key] === 'string') {
      if (productA[key].toLowerCase() > productB[key].toLowerCase()) return 1
      if (productA[key].toLowerCase() < productB[key].toLowerCase()) return -1
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

export function filterProducts(productList, filters) {
  let filteredList = JSON.parse(JSON.stringify(productList))
  console.log('before: ', filteredList)
  for (const [key, value] in Object.entries(filters)) {
    filteredList = filteredList.filter((product) => product[key.toLowerCase()] === value)
  }
  console.log('after: ', filteredList)
}
