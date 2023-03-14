export function sortBy(key) {
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

export function filterProducts(productList, { active, category }) {
  // Båda alternativen!
  let newArr = [...productList]
  if (active !== null && typeof active === 'boolean') {
    newArr = newArr.filter((product) => product.active === active)
  }

  if (category.length > 0) {
    newArr = newArr.filter((product) => category.some((cat) => cat.toLowerCase() === product.category2.toLowerCase()))
  }
  return newArr
}
